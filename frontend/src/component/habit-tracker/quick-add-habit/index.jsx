import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { createHabit } from '../../../services/habitService'

const QuickAddHabit = ({ onAddHabit }) => {
  
     const [form, setForm] = useState({
        title: '',
        frequency: 'Daily',
        category: '',
     })


     const handleCreateHabit = async() => {
        
         try {
            const newHabit = await createHabit(
                {
                    title: form.title,
                    frequency: form.frequency,
                    category: form.category,
                }
            );

                if(newHabit){
                onAddHabit(newHabit)
                setForm({
                    title: '',
                    frequency: 'Daily',
                    category: '',
                })
            }
         } catch (error) {
            console.error('Error creating habit:', error)
         }
        }

  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Quick Add Habit</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Habit Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter habit title"
          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Frequency
        </label>
        <select
        
          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
          placeholder="e.g., Health, Productivity, Fitness"
          className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-start space-x-2">
        <button
          className="bg-gray-950 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer flex items-center gap-2"

          onClick = {handleCreateHabit}
        >
          <Plus size={18} />
          Create Habit
        </button>
      </div>
    </div>
  )
}

export default QuickAddHabit
