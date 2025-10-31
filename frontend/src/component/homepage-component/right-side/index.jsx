import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Quote, Target, X } from 'lucide-react'
import { fetchHabit, createHabit } from '../../../services/habitService'
import { fetchGoals, createGoal } from '../../../services/goalService'
import QuickAddCard from '../../goal-component/quick-add-card'
import QuickAddHabit from '../../habit-tracker/quick-add-habit'

const RightSide = () => {
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(true)

  const [habits, setHabits] = useState([])
  const [goals, setGoals] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [habitModalOpen, setHabitModalOpen] = useState(false)
  const [goalModalOpen, setGoalModalOpen] = useState(false)

  // Fetch random quote
  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.api-ninjas.com/v2/quoteoftheday', {
        headers: {},
      })
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadHabitsAndGoals = async () => {
    setDataLoading(true)
    try {
      const [habitsData, goalsData] = await Promise.all([
        fetchHabit(),
        fetchGoals(),
      ])
      setHabits(habitsData)
      setGoals(goalsData)
    } catch (error) {
      console.error('Error loading habits or goals:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const handleAddGoal = async (newGoal) => {
    try {
      const createdGoal = await createGoal(newGoal)
      setGoals((prev) => [...prev, createdGoal])
      setGoalModalOpen(false)
    } catch (error) {
      console.error('Error creating goal:', error)
    }
  }

  const handleAddHabit = async (newHabit) => {
    try {
      const createdHabit = await createHabit(newHabit)
      setHabits((prev) => [...prev, createdHabit])
      setHabitModalOpen(false)
    } catch (error) {
      console.error('Error creating habit:', error)
    }
  }

  useEffect(() => {
    fetchQuote()
    loadHabitsAndGoals()
  }, [])

  return (
    <div className="space-y-4 w-160 rounded-2xl">


      <div className="rounded-2xl border border-gray-200 px-5 py-3 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Quote size={20} className="text-indigo-600" />
            Quote of the Day
          </h1>
          <button
            onClick={fetchQuote}
            className="text-sm text-blue-600 hover:underline"
          >
            New Quote
          </button>
        </div>

        <div className="min-h-24 flex flex-col justify-center items-center bg-white rounded-lg border border-gray-300 text-center hover:ring-2 hover:ring-blue-950 p-3">
          {loading ? (
            <p className="text-gray-400 italic">Loading quote...</p>
          ) : (
            <>
              <h1 className="text-gray-950 italic">"{quote.quote || "Work Hard Until You Achieve Your Success Someone is waiting for you."}"</h1>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4">
        <div className="flex flex-col md:flex-row gap-2 justify-between h-109">
         
          <div className="flex-1 flex flex-col justify-between border border-gray-200 rounded-xl p-2 hover:ring-2 hover:ring-blue-950 transition">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target size={22} className="text-teal-600" />
                <h1 className="text-xl font-semibold text-gray-900">Habits</h1>
              </div>

              <div className="flex flex-col gap-2 h-82 overflow-y-auto [&::-webkit-scrollbar]:w-1 
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              dark:[&::-webkit-scrollbar-track]:bg-neutral-700
              dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {dataLoading ? (
                  <p className="text-gray-400 italic text-sm text-center">
                    Loading habits...
                  </p>
                ) : (
                  habits.map((habit, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-gray-950 text-medium bg-gray-50 hover:bg-gray-100"
                    >
                      {habit.title}
                    </div>
                  ))
                ) }
              </div>
            </div>

            <button onClick={() => {setHabitModalOpen(true)}} className="mt-3 bg-gray-950 hover:bg-gray-700 text-white px-4 py-2 font-medium rounded-lg w-full">
              + Add New Habit
            </button>
          </div>

     
          <div className="flex-1 flex flex-col justify-between border border-gray-200 rounded-xl p-2 hover:ring-2 hover:ring-blue-950 transition">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target size={22} className="text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Goals</h1>
              </div>

              <div className="flex flex-col gap-2 h-82 overflow-y-auto [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {dataLoading ? (
                  <p className="text-gray-400 italic text-sm text-center">
                    Loading goals...
                  </p>
                ) : (
                  goals.map((goal, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg px-3 py-2 h-10 text-gray-950 text-medium bg-gray-50 hover:bg-gray-100"
                    >
                      {goal.title}
                    </div>
                  ))
                )}
              </div>
            </div>

            <button onClick={() => setGoalModalOpen(true)} className="mt-3 bg-gray-950 hover:bg-gray-700 text-white px-4 py-2 font-medium rounded-lg w-full">
              + Add New Goal
            </button>
          </div>
        </div>
      </div>


      {goalModalOpen && (
        <Modal onClose={() => setGoalModalOpen(false)}>
          <QuickAddCard onAddGoal={handleAddGoal} />
        </Modal>
      )}

      {/* Habit Modal */}
      {habitModalOpen && (
        <Modal onClose={() => setHabitModalOpen(false)}>
          <QuickAddHabit onAddHabit={handleAddHabit} />
        </Modal>
      )}
    </div>
  )
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] relative p-6">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default RightSide
