
const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  steps: {
    type: Number,
    required: true
  },
  sleep: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('metric', MetricSchema);
    