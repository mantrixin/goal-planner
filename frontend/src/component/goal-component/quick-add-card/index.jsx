import React, { useState } from 'react'
import { Plus } from 'lucide-react'

const QuickAddCard = ({ onAddGoal }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    milestone: "",
    milestones: []
  })

  const handleAddMilestone = () => {
    if(form.milestone.trim() !== '' ){
      setForm(prev => ({
        ...prev, 
        milestones: [...prev.milestones, {text: prev.milestone, completed: false}],
        milestone: ''
      }))
    }
  }

  const handleCreateGoal = () => {
    if (!form.title.trim()) return alert('Please enter a goal title')

    const newGoal = {
      title: form.title,
      description: form.description,
      progress: 0,
      milestones: form.milestones,
      linkedHabits: []
    }

    onAddGoal(newGoal)
    setForm({ title: '', description: '', milestone: '', milestones: [] })
  }

  const clear = () => setForm({ title: '', description: '', milestone: '', milestones: [] })

  return (
    
    <div className="bg-white rounded-lg ">
      <h3 className="text-lg font-semibold mb-4">Quick Add</h3>


      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Goal title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter goal title"
          className="w-full border border-gray-200 rounded-lg  p-2 "
        />
      </div>


      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Short description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Short goal description"
          className="w-full border border-gray-200 rounded-lg p-2 "
        />
      </div>

   
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Add milestone"
          value={form.milestone}
          onChange={(e) => setForm(prev => ({ ...prev, milestone: e.target.value }))}
          className="flex-grow border border-gray-200 rounded-lg p-2 mr-2 "
        />
      
        <button onClick={handleAddMilestone} className="flex items-center bg-gray-950 px-2 py-2 rounded-lg  text-white cursor-pointer">
          <Plus className="w-4 h-4 mr-1" /> Add
        </button>
      </div>

      
      { <ul className="mb-2 list-disc ml-6 text-md text-gray-950">
          {form.milestones.map((m, i) => (
            <li key={i}>{m.text}</li>
          ))}
        </ul>
      }


      <div className="flex justify-start space-x-2">
        <button onClick={handleCreateGoal} className="bg-gray-950 text-white px-4 py-2 border-white rounded-lg hover:bg-green-600 cursor-pointer">Create Goal</button>
      </div>
    </div>
  )
}

export default QuickAddCard
