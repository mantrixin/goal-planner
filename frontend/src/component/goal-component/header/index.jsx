import React from 'react'
import { Link, Plus, Goal } from 'lucide-react'

const GoalHeader = ({ selectedGoalIndex, setShowHabitLinker, setShowQuickAdd }) => {
  return (
     <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          Personal Goals 
          <span className="text-sm text-gray-500 flex items-center justify-center">
            <Goal className="w-6 h-6 ml-2 mr-1" /> Keep going!
          </span>
        </h1>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => { if (selectedGoalIndex !== null) setShowHabitLinker(true) }} 
            className="flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            <Link className="w-4 h-4 mr-1" /> Link Habit
          </button>
        
          <button 
            onClick={() => setShowQuickAdd(true)} 
            className="bg-gray-950 text-white font-semibold px-4 py-2 rounded-lg flex items-center hover:bg-green-500"
          >
            <Plus className="w-4 h-4 mr-1" /> New Goal
          </button>
        </div>
      </header>
  )
}

export default GoalHeader
