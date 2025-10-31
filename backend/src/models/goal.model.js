import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    milestones: [
      {
        text: { type: String },
        completed: { type: Boolean, default: false },
      },
    ],
  
    linkedHabits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
