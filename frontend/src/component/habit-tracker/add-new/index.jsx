import React from "react";
import { Plus } from "lucide-react";

const AddHabitForm = ({ newHabit, setNewHabit, addHabit }) => {
  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-2xl px-6 py-3 flex flex-col gap-3 ">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Plus size={20} /> Add New Habit
      </h2>
      <input
        type="text"
        placeholder="Habit title"
        value={newHabit.title}
        onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
        className="bg-gray-100 p-2 rounded-lg outline-none hover:ring-2 hover:ring-blue-950 w-[95%]"
      />
      <select
        value={newHabit.frequency}
        onChange={(e) =>
          setNewHabit({ ...newHabit, frequency: e.target.value })
        }
        className="bg-gray-100 p-2 rounded-lg outline-none hover:ring-2 hover:ring-blue-950 w-[95%]"
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={newHabit.category}
        onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
        className="bg-gray-100 p-2 rounded-lg outline-none hover:ring-2 hover:ring-blue-950 w-[95%]"
      />
      <button
        onClick={addHabit}
        className="px-4 py-2 bg-black text-white rounded-xl flex items-center gap-2 hover:bg-gray-800 w-max"
      >
        <Plus size={18} /> Add Habit
      </button>
    </div>
  );
};

export default AddHabitForm;
