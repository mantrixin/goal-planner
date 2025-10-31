import React, { useState } from 'react'
import { Flame, CheckCircle, Trash2, Edit2Icon, Save } from 'lucide-react'

const HabitLists = ({ habits, toggleHabit, deleteHabit, handleUpdatedHabit }) => {
  const [editHabitId, setEditHabitId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editCategory, setEditCategory] = useState('')

  const handleEditClick = (habit) => {
    setEditHabitId(habit._id)
    setEditTitle(habit.title)
    setEditCategory(habit.category || '')
  }

  const handleSave = async (habitId) => {
    try {
      await handleUpdatedHabit(habitId, { title: editTitle, category: editCategory })
      setEditHabitId(null)
  } catch (error) {
      console.error("Failed to update Habit:", error)
  }
}
  return (
    <div className="space-y-4">
      {habits.map((habit) => {
        const isEditing = editHabitId === habit._id

        return (
          <div
            key={habit._id}
            className={`flex items-center justify-between p-4 border rounded-xl ${
              habit.isCompleted
                ? 'bg-green-50 border-green-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div>
              {isEditing ? (
                
                <div className='flex gap-2 '>
                  <input
                    type="text"
                    value={editTitle}
                    placeholder='Edit Title'
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="h-6 border border-green-600 rounded-lg mb-1 w-1/2 font-semibold text-gray-950 outline-none focus:ring-1 focus:border-gray-950"
                  />
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className=" border h-6 border-green-600  rounded-lg text-sm text-gray-600 w-1/2"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-gray-800">{habit.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    {habit.frequency}{' '}
                    <span className="font-medium">{habit.category}</span>
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-orange-500">
                <Flame size={18} className="mr-1" /> {habit.streak} days
              </div>
              <button
                onClick={() => toggleHabit(habit._id)}
                className={`p-2 rounded-full transition ${
                  habit.isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <CheckCircle size={20} />
              </button>

              {isEditing ? (
                <Save
                  size={18}
                  onClick={() => handleSave(habit._id)}
                  className="cursor-pointer text-green-600"
                />
              ) : (
                <Edit2Icon
                  size={18}
                  onClick={() => handleEditClick(habit)}
                  className="cursor-pointer text-gray-600 hover:text-blue-600"
                />
              )}

              <Trash2
                size={18}
                onClick={() => deleteHabit(habit._id)}
                className="cursor-pointer text-red-500 hover:text-red-600"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HabitLists
