const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  email: { type: String, required: true, match: /.+@.+\..+/ }, // E-mail validatie
  name: { type: String, required: false, minlength: 1 }, // Minimale lengte validatie
  individualCount: { type: Number, required: false, default: 0 }, // Positieve aantallen
  familyCount: { type: Number, required: false, default: 0 },
  totalCost: { type: Number, required: true, min: 0 },
  paymentIntentId: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'succeeded', 'failed'] },
});

module.exports = mongoose.model('Ticket', TicketSchema);
