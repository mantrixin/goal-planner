import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  date: {
    type: Date, 
    required: true
  },
  mood: {
    type: String, 
    required: true,
    enum: ['happy', 'relaxed', 'calm', 'neutral', 'sad', 'anxious']
  },
  habits: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
}
)

export default mongoose.model("Mood", moodSchema);