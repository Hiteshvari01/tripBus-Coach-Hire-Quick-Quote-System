const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TripQuote',  // Yeh reference TripQuote model ka hoga
    required: true
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: Number,  // Duration in minutes (integer)
    required: true,
    min: 0
  },
  // Agar aap chahe to extra fields bhi add kar sakte hain, jaise stopType: 'going' ya 'return'
  stopType: {
    type: String,
    enum: ['going', 'return'],
    default: 'going'
  }
}, { timestamps: true });

module.exports = mongoose.model('Stop', stopSchema);
