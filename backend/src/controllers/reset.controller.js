import Goal from "../models/goal.model.js";
import Habit from "../models/habit.model.js";
import Mood from "../models/mood.model.js";

export const resetData = async (req, res)   => {


    try {

        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
        
        console.log("🔄 Reset Data Request - User ID:", userId);

        const goalResult = await Goal.deleteMany({user: userId});
        const habitResult = await Habit.deleteMany({user: userId});
        const moodResult = await Mood.deleteMany({user: userId});
        
        console.log("✅ Deleted:", {
            goals: goalResult.deletedCount,
            habits: habitResult.deletedCount,
            moods: moodResult.deletedCount
        });
        
        res.status(200).json({
            message: "User data reset successfully.",
            deleted: {
                goals: goalResult.deletedCount,
                habits: habitResult.deletedCount,
                moods: moodResult.deletedCount
            }
        });

    } catch (error) {
        console.error("❌ Error resetting user data:", error);
        res.status(500).json({message: "Error resetting user data.", error: error.message});
    }
}