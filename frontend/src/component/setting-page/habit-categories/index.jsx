import React, { useEffect, useState } from 'react';
import { EditIcon, Trash2Icon } from 'lucide-react';
import { updateHabit } from '../../../services/habitService';

const HabitCategories = ({ habits, darkMode, deleteHabit, handleUpdatedHabit }) => {
  const [editHabitId, setEditHabitId] = useState(null);
  const [editCategory, setEditCategory] = useState('');

  const handleEditClick = (habit) => {
    setEditHabitId(habit._id);
    setEditCategory(habit.category);
  };

  const handleSave = async (habitId) => {
    try {
      const updatedHabit = await updateHabit(habitId, { category: editCategory });
      handleUpdatedHabit(updatedHabit);
      setEditHabitId(null);
    } catch (error) {
      console.error("Error saving habit category:", error);
    }
  };

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} space-y-4`}>
      <h2 className="text-xl font-semibold">Manage Habit Categories</h2>

      <ul className="space-y-2">
        {habits.map((habit) => (
          <li
            key={habit._id}
            className={`flex justify-between items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            {editHabitId === habit._id ? (
              <input
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="p-1 rounded border"
              />
            ) : (
              <span>{habit.category}</span>
            )}

            <div className="flex space-x-2">
              <EditIcon
                onClick={() => handleEditClick(habit)}
                className="text-red-600 hover:text-red-700 font-medium"
              />
              {editHabitId === habit._id && (
                <button onClick={() => handleSave(habit._id)} className="text-green-600 hover:text-green-700">
                  Save
                </button>
              )}
              <Trash2Icon
                onClick={() => deleteHabit(habit._id)}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitCategories;
