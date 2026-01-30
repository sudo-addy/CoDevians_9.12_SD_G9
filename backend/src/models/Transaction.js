const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bond_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bond',
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell', 'transfer'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price_per_unit: Number,
  total_amount: Number,
  payment_method: String,
  payment_status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  settlement_date: Date,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'settled', 'failed'],
    default: 'pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

transactionSchema.index({ transaction_id: 1, user_id: 1, bond_id: 1, timestamp: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
