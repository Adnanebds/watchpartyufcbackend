require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Webhook endpoint (place this before other routes and middleware)
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('Webhook event received:', event);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent);

        const ticket = await Ticket.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { paymentStatus: 'succeeded' },
          { new: true }
        );

        if (ticket) {
          await sendTicketEmail(ticket);
        } else {
          console.log('Ticket not found for PaymentIntent ID:', paymentIntent.id);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        console.log('PaymentIntent failed!', failedPaymentIntent);

        await Ticket.findOneAndUpdate(
          { paymentIntentId: failedPaymentIntent.id },
          { paymentStatus: 'failed' }
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error('Error handling webhook event:', err.message);
    return res.status(500).send('Internal Server Error');
  }

  res.json({ received: true });
});

// Use middleware for other routes
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

async function generateTicketPDF(ticket) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      const bufferStream = new PassThrough();
      doc.pipe(bufferStream);

      doc
        .fontSize(25)
        .text('Event Ticket', 100, 80)
        // Voeg andere PDF-inhoud hier toe

      doc.end();

      const chunks = [];
      bufferStream.on('data', chunk => chunks.push(chunk));
      bufferStream.on('end', () => resolve(Buffer.concat(chunks)));
      bufferStream.on('error', err => reject(new Error(`Stream Error: ${err.message}`)));
    } catch (error) {
      reject(new Error(`PDF Generation Error: ${error.message}`));
    }
  });
}


async function sendTicketEmail(ticket) {
  const pdfBuffer = await generateTicketPDF(ticket);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ticket.email,
    subject: 'Your Event Ticket',
    text: `Dear ${ticket.name},\n\nYour payment was successful! Please find your ticket attached to this email.\n\nThank you for your purchase! Enjoy the event!`,
    attachments: [
      {
        filename: 'event_ticket.pdf',
        content: pdfBuffer
      }
    ]
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Ticket email sent successfully');
  } catch (error) {
    console.error('Error sending ticket email:', error.message);
    throw error;
  }
}

const { body, validationResult } = require('express-validator');

app.post('/create-payment-intent', [
  body('amount').isInt({ gt: 0 }).withMessage('Amount must be a positive integer'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('name').isLength({ min: 1 }).withMessage('Name is required'),
  body('individualCount').optional().isInt({ min: 0 }).withMessage('Individual count must be a non-negative integer'),
  body('familyCount').optional().isInt({ min: 0 }).withMessage('Family count must be a non-negative integer'),
  body('totalCost').isFloat({ gt: 0 }).withMessage('Total cost must be a positive number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, individualCount = 0, familyCount = 0, totalCost, email, name } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['ideal'],
    });

    const newTicket = new Ticket({
      email,
      name,
      individualCount,
      familyCount,
      totalCost,
      paymentIntentId: paymentIntent.id,
      paymentStatus: 'pending',
    });
    await newTicket.save();

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Intent Error:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


app.post('/send-email', async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const ticket = await Ticket.findOne({ paymentIntentId });
    if (ticket) {
      await sendTicketEmail(ticket);
      res.json({ success: true });
    } else {
      console.log('Ticket not found for PaymentIntent ID:', paymentIntentId);
      res.status(404).json({ success: false, error: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});