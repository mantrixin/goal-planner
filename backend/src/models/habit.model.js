import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  frequency: {
    type: String,
    required: true,
    enum: ["Daily", "Weekly", "Monthly"],
  },

  category: {
    type: String,
    required: false,
  },

  streak: {
    type: Number,
    default: 0,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  completionHistory: [
    {
      type: Date,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Habit", habitSchema);
