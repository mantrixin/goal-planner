import Mood from "../models/mood.model.js";

const ALLOWED_MOODS = ['happy', 'relaxed', 'calm', 'neutral', 'sad', 'anxious'];

/*
POST

- body se mood nikalo
- check karo mood aa rha hai ki nhi
- mood allowed moods me hai ki nhi
- user ID req.user se nikalo, fallback use karo agar undefined ho
- check karo kya user ne already aaj mood log kiya hai
- agar nahi kiya, to DB me insert karo
- created mood ko response me return karo
*/
export const createMood = async(req, res) => {
   try {
     const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";
     const { mood, habits = [], date = new Date() } = req.body;

     if(!mood || !ALLOWED_MOODS.includes(mood)){
        return res.status(400).json({ message: `A valid mood (${ALLOWED_MOODS.join(', ')}) is required.` });
     }

 
    const todayStart = new Date(date);
    todayStart.setHours(0, 0, 0, 0);            

    const todayEnd = new Date(date);
    todayEnd.setHours(23, 59, 59, 999);

    const existingMood = await Mood.findOne({user: userId, date: {$gte: todayStart, $lt: todayEnd}});
    if (existingMood) {
            return res.status(409).json({ message: "Mood already logged for today." });
    }

    const newLog = await Mood.create({
        user: userId,
        mood,
        habits,
        date: new Date(date)
    });

    res.status(201).json({ message: "Mood logged successfully!", data: newLog });

   } catch (error) {
    res.status(500).json({message: error.message});
   }
};

/*
GET

- user ID req.user se nikalo, fallback use karo agar undefined ho
- DB se user ke sare mood logs fetch karo
- sort karo newest se oldest
- agar koi mood log nahi mila to empty array ke sath message return karo
- agar mood logs mile to response me return karo
*/
export const getMoodLogs = async (req, res) => {
    try {
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";

        const logs = await Mood.find({ user: userId }).sort({ date: -1 });

        if (!logs || logs.length === 0) {
            return res.status(200).json({ message: "No mood logs found.", data: [] });
        }

        res.status(200).json({ message: "Mood logs fetched successfully.", data: logs });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
DELETE - /api/moods/:id

- URL se mood log ka ID nikalo
- user ID req.user se nikalo, fallback use karo
- DB me check karo kya mood log exist karta hai aur user ka hai
- agar nahi mila to 404 error
- agar mila to delete karo
- deleted mood log ko response me bhejo
*/
export const deleteMoodLog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id || "6718b12d1a83f3b04b9cb8dd";

        const result = await Mood.findOneAndDelete({ _id: id, user: userId });

        if (!result) {
            return res.status(404).json({ message: "Mood log not found or unauthorized." });
        }

        res.status(200).json({ message: "Mood log deleted successfully.", data: result });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
