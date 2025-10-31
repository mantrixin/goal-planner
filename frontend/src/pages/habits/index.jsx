import React, { useEffect, useState } from "react";
import AddHabitForm from "../../component/habit-tracker/add-new";
import StreaksCard from "../../component/habit-tracker/streaks-card";
import HabitLists from "../../component/habit-tracker/habit-lists";
import {fetchHabit, createHabit, updateHabit, deleteHabit, toggleHabitCompletion} from "../../services/habitService";
import { toast } from "react-toastify";

const HabitPage = () => {

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState
  ({
    title: "",
    frequency: "Daily",
    category: "",
    });

  useEffect(() => {
    const loadHabit = async () => {
      try {
        const data = await fetchHabit();
        setHabits(data);
      } catch (error) {
        toast.error("Data is Failed to Load");
      }
    };
    loadHabit();
  }, []);

  const toggleHabit = async (id) => {
    try {
      const updatedHabit = await toggleHabitCompletion(id);
      if (updatedHabit) {
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === id || habit._id === id ? updatedHabit : habit
          )
        );
        toast.success(`Streak is now updated to ${updatedHabit.streak}!`);
      }
    } catch (error) {
      toast.error("Data is Failed to Load");
    }
  };

  const addHabit = async () => {
    if (!newHabit.title || !newHabit.title.trim()) return;

    try {
      const createdHabit = await createHabit(newHabit);
      if (createdHabit) {
        setHabits([...habits, createdHabit]);
        toast.success("Habit added successfully");
      } else {
        toast.error("Failed to add Habit");
      }
    } catch (error) {
      toast.error("Failed to add Habit");
    }
  };

 const handleUpdatedHabit = async (id, habitData) => {
     try {
      const updatedHabit = await updateHabit(id, habitData);
      if (updatedHabit) {
        setHabits((prev) => prev.map((habit) => habit._id === id ? updatedHabit : habit))
        toast.success("Habit Updated Successfully")
      }
     } catch (error) {
      console.error("Failed to update Habit:", error)
     }
 }


  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.id !== id && habit._id !== id)
      );
      toast.success("Habit deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete Habit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4 space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Habit Tracker</h1>
        </div>
        <p className="text-gray-500">
          Track your habits daily, weekly, or monthly. Keep your streaks alive 🔥
        </p>
        <div className="grid grid-cols-2 gap-4">
          <AddHabitForm
            newHabit={newHabit}
            setNewHabit={setNewHabit}
            addHabit={addHabit}
          />
          <StreaksCard habits={habits} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Your Habits</h2>
        {habits.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No habits yet. Start by adding one!
          </p>
        ) : (
          <HabitLists
            habits={habits}
            handleUpdatedHabit={handleUpdatedHabit}
            toggleHabit={toggleHabit}
            deleteHabit={handleDeleteHabit}
          />
        )}
      </div>
    </div>
  );
};

export default HabitPage;