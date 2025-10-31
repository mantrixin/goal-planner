import Goal from "../models/goal.model.js";

/*
POST

- body se data ko nikalo
- name ek string hai kya?
- progress aa rha hai ki nhi
- progress kya mera number hai?
- progress kya mera 0 - 100 ke bich me
- data insert karo DB me
- and usi ko return karo
*/

export const createGoal = async (req, res) => {
  try {
    const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
    const { title, description, progress, milestones = [] } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (typeof title !== "string")
      return res.status(400).json({ message: "Title must be a string" });

    if (description && typeof description !== "string")
      return res.status(400).json({ message: "Description must be a string" });

    if (progress !== undefined) {
      if (typeof progress !== "number")
        return res.status(400).json({ message: "Progress must be a number" });
      if (progress < 0 || progress > 100)
        return res.status(400).json({ message: "Progress must be between 0 and 100" });
    }

    const newGoal = await Goal.create({
      title,
      description: description,
      milestones,
      progress: typeof progress === "number" ? progress : 0,
      user: userId,
    });

    return res
      .status(201)
      .json({ message: "Goal created successfully", data: newGoal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
    const goals = await Goal.find({ user: userId });

    if (!goals || goals.length === 0)
      return res.status(404).json({ message: "No goals found" });

    return res
      .status(200)
      .json({ message: "Goals fetched successfully", data: goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 
PUT - /api/goals/:id

URL se id nikalo (req.params se)
Body se data nikalo → title, description, progress
Check karo kya given id se koi goal exist karta hai DB me
agar nahi milta to 404 error return karo ("Goal not found")
Jo fields body me aaye hain unko validate karo:
title: agar aaya hai to string hona chahiye
description: agar aaya hai to string hona chahiye
progress:
number hona chahiye
0–100 ke beech me hona chahiye
Sirf wahi fields update karo jo body me aayi hain
Updated goal ko save karo DB me
Updated data ko response me return karo with success message
Agar koi error aaye to 500 status ke saath error message bhejo
*/

export const updateGoal = async (req, res) => {
  try {
    const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
    const { id } = req.params;
    const { title, description, progress, milestones } = req.body;

    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (!goal.user.equals(userId))
      return res.status(403).json({ message: "Not authorized to update this goal" });

    if (title && typeof title !== "string") {
      return res.status(400).json({ message: "Title must be a string" });
    }

    if (description && typeof description !== "string") {
      return res.status(400).json({ message: "Description must be a string" });
    }

    if (progress !== undefined) {
      if (typeof progress !== "number") {
        return res.status(400).json({ message: "Progress must be a number" });
      }
      if (progress < 0 || progress > 100) {
        return res.status(400).json({ message: "Progress must be between 0 and 100" });
      }
      goal.progress = progress;
    }

    if (title) goal.title = title;
    if (description) goal.description = description;
    if (milestones) goal.milestones = milestones;

    const updatedGoal = await goal.save();
    return res
      .status(200)
      .json({ message: "Goal updated successfully", data: updatedGoal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGoalProgress = async (req, res) => {
  try {
    const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
    const { id } = req.params;
    const { progress } = req.body;

    if (progress === undefined)
      return res.status(400).json({ message: "Progress is required" });
    if (typeof progress !== "number")
      return res.status(400).json({ message: "Progress must be a number" });
    if (progress < 0 || progress > 100)
      return res.status(400).json({ message: "Progress must be between 0 and 100" });

    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (!goal.user.equals(userId))
      return res.status(403).json({ message: "Not authorized to update this goal" });

    goal.progress = progress;
    const updated = await goal.save();
    return res.status(200).json({ message: "Progress updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*
DELETE - /api/goals/:id

URL se goal ka id nikalo (req.params se)
Check karo kya given id se koi goal exist karta hai DB me
agar goal nahi milta → return 404 ("Goal not found")
agar goal mil gaya to us goal ko delete karo (Goal.findByIdAndDelete)
Delete hone ke baad success message ke sath response bhejo
Agar koi unexpected error aaye to 500 status ke sath error message bhejo
*/

export const deleteGoal = async (req, res) => {
  try {
    const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
    const { id } = req.params;

    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (!goal.user.equals(userId))
      return res.status(403).json({ message: "Not authorized to delete this goal" });

    await Goal.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Goal deleted successfully", data: goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
