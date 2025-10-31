import Habit from "../models/habit.model.js";

const ALLOWED_FREQUENCIES = ['Daily', 'Weekly', 'Monthly'];

/*
POST

- body se data ko nikalo
- title aur frequency aa rhi hai ki nhi
- frequency allowed values me hai ki nhi
- category optional hai
- user ka ID req.user se nikalo, fallback use karo agar undefined ho
- data insert karo DB me
- aur created habit ko response me return karo
*/
export const createHabit = async (req, res) => {
    try {
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
        const { title, frequency, category } = req.body;

        if (!title || !frequency) {
            return res.status(400).json({ message: "title and Frequency are required." });
        }

        if (!ALLOWED_FREQUENCIES.includes(frequency)) {
            return res.status(400).json({ message: `Frequency must be one of ${ALLOWED_FREQUENCIES.join(', ')}` });
        }

        const newHabit = await Habit.create({
            title,
            frequency,
            category,
            user: userId,
        });

        return res.status(201).json({
            message: "Habit Created Successfully",
            data: newHabit,
        });

    } catch (error) {
        console.error("Error creating habit:", error);
        return res.status(500).json({ message: error.message });
    }
};

/*
GET

- user ID req.user se nikalo, fallback use karo agar undefined ho
- DB se us user ke sare habits fetch karo
- sort karo newest se oldest
- agar koi habit nahi mila to empty array ke sath message return karo
- agar habit mile to data return karo
*/
export const getHabits = async (req, res) => {
    try {
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
        const habits = await Habit.find({ user: userId }).sort({ createdAt: -1 });

        if (!habits || habits.length === 0) {
            return res.status(200).json({ message: "No habits found for this user.", data: [] });
        }

        res.status(200).json({ message: "Successfully fetched all Habits", data: habits });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const updateHabit = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
        const {title, frequency, category} = req.body;

        const habit = await Habit.findOneAndUpdate({_id: id, user: userId}, { title, frequency, category }, {new: true});
        if(!habit){
            return res.status(404).json({message: "Habit not found."});
        }

        return res.status(200).json({message: "Habit successfully updated", data: habit});

    } catch (error) {
        return res.status(404).json({message: "Habit not Found."})
    }
    
}

/*
DELETE - /api/habits/:id

- URL se habit ka ID nikalo
- user ID req.user se nikalo, fallback use karo
- DB me check karo kya habit exist karta hai
- agar habit nahi mila to 404 error
- agar habit user ka nahi hai to 403 error
- agar mila to delete karo
- deleted habit ko response me bhejo
*/
export const deleteHabit = async (req, res) => {
    try {
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
        const { id } = req.params;

        const habit = await Habit.findById(id);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found." });
        }

        if (!habit.user.equals(userId)) {
            return res.status(403).json({ message: "Not authorized to delete this habit." });
        }

        await Habit.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Habit deleted successfully.",
            data: habit,
        });

    } catch (error) {
        console.error("Error deleting habit:", error);
        res.status(500).json({ message: error.message });
    }
};




export const toggleHabitCompletion = async (req, res) => {

    try {

        const {id} = req.params;
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";

        const habit = await Habit.findById(id);

        if(!habit){
            return res.status(404).json({message: "Habit not found."});
        }

        if(!habit.user.equals(userId)){
            return res.status(403).json({message: "Not authorized to update this habit."});
        }

        habit.isCompleted = !habit.isCompleted
        if(habit.isCompleted){
            habit.streak += 1;
        } else {
            habit.streak = habit.streak;
        }
        const updatedHabit =  await habit.save();

        return res.status(200).json({message: "Habit completed successfully", data: updatedHabit});
        
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}



