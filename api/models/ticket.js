// models/ticket.js (assuming you have this model file)
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  individualCount: { type: Number, required: true },
  familyCount: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  paymentIntentId: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Ticket', TicketSchema);
