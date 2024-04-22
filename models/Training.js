const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },  // Reference unit model if implemented
  startDate: Date,
  endDate: Date,
  resources: [String],
  // ... other fields
});

module.exports = mongoose.model('Training', trainingSchema);
