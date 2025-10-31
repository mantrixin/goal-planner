import React, { useEffect, useState } from 'react';
import QuickAddCard from '../../component/goal-component/quick-add-card';
import GoalCard from '../../component/goal-component/goal-card';
import { Link, Trash2, X } from 'lucide-react';
import GoalHeader from '../../component/goal-component/header';
import { fetchGoals, createGoal, deleteGoal, updateGoal } from '../../services/goalService';
import { fetchHabit } from '../../services/habitService';

function GoalsPage() {
 const [goals, setGoals] = useState([]);
 const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);
 const [allHabits, setAllHabits] = useState([])
 const [showQuickAdd, setShowQuickAdd] = useState(false);
 const [showHabitLinker, setShowHabitLinker] = useState(false);

 useEffect(() => {
   const loadGoals = async () => {
     try {
       const data = await fetchGoals();
       setGoals(data);
     } catch (error) {
       console.error("Error fetching goals:", error);
     }

     try {
        const habitData = await fetchHabit();
        setAllHabits(habitData)
     } catch (error) {
        console.error("Error fetching Habit", error)
     }
   };
   loadGoals();
 }, []);

 const handleAddGoal = async (newGoal) => {
   try {
     const createdGoal = await createGoal(newGoal);
     setGoals((prev) => [...prev, createdGoal]);
     setShowQuickAdd(false);
   } catch (error) {
     console.log("Error creating goal:", error);
   }
 };

 const handleUpdateGoal = (updatedGoal) => {
   setGoals((prev) =>
     prev.map((goal) => (goal._id === updatedGoal._id ? updatedGoal : goal))
   );
 };

 const handleAddHabitToGoal = async (selectedHabits) => {
   if (selectedGoalIndex === null) return;
   const updatedGoals = [...goals];
   updatedGoals[selectedGoalIndex].linkedHabits = [
     ...(updatedGoals[selectedGoalIndex].linkedHabits || []),
     ...selectedHabits
   ];
   setGoals(updatedGoals);
   setShowHabitLinker(false);
 };

 const handleDeleteGoal = async(index) => {
   const goalToDelete = goals[index];
   try{
     await deleteGoal(goalToDelete._id);
     const updatedGoals = goals.filter((_id, i) => i !== index);
     setGoals(updatedGoals);
   } catch (error) {
     console.error("Error deleting goal:", error);
   }
 };

 return (
   <div className="min-h-screen bg-gray-50 px-6 py-4">
     <GoalHeader 
       selectedGoalIndex={selectedGoalIndex}
       setShowHabitLinker={setShowHabitLinker}
       setShowQuickAdd={setShowQuickAdd} 
     />

     <div className="grid grid-cols-3 gap-8 mt-4">
       <div className="col-span-2 space-y-4 relative">
         {goals.length === 0 ? (
           <p className="text-gray-500 text-center py-10 italic">
             No goals yet. Click New Goal to add one!
           </p>
         ) : (
           goals.map((goal, index) => (
             <div
               key={goal._id || index}
               onClick={() => setSelectedGoalIndex(index)}
               className="relative"
             >
               <button
                 onClick={(e) => { 
                   e.stopPropagation(); 
                   handleDeleteGoal(index);
                 }}
                 className="absolute top-4 right-4 bg-red-600 p-1 text-white z-10 flex items-center rounded-xl cursor-pointer"
               >
                 <Trash2 className="w-5 h-5 mr-1" /> Delete
               </button>

               <GoalCard {...goal} onUpdate={handleUpdateGoal} />
             </div>
           ))
         )}
       </div>

       <div className="space-y-8">
         {selectedGoalIndex !== null && (
           <div className="bg-white rounded-lg p-6 h-65 overflow-y-auto
             [&::-webkit-scrollbar]:w-0
             [&::-webkit-scrollbar-track]:bg-gray-100
             [&::-webkit-scrollbar-thumb]:bg-gray-300
             dark:[&::-webkit-scrollbar-track]:bg-neutral-700
             dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
           ">
             <div className="flex gap-2 items-center mb-4">
               <Link /> 
               <h2 className="text-lg font-semibold">Link Habits to Achieve the Goal</h2>
             </div>
             <button
               onClick={() => setShowHabitLinker(true)}
               className="bg-gray-950 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
             >
               Link Habit
             </button>

             {goals[selectedGoalIndex]&& (
               <ul className="mt-4 list-disc list-inside text-gray-700">
                 {goals[selectedGoalIndex].linkedHabits.map((habit, idx) => (
                   <li key={idx}>{habit.title} to {goals[selectedGoalIndex].title}</li>
                 ))}
               </ul>
             )}
           </div>
         )}
       </div>
     </div>

     {showQuickAdd && (
       <Modal onClose={() => setShowQuickAdd(false)}>
         <QuickAddCard onAddGoal={handleAddGoal} onClose={() => setShowQuickAdd(false)} />
       </Modal>
     )}

     {showHabitLinker && selectedGoalIndex !== null && (
       <Modal onClose={() => setShowHabitLinker(false)}>
         <HabitLinkerCard habits={allHabits} onAddHabit={handleAddHabitToGoal} />
       </Modal>
     )}
   </div>
 );
}

function Modal({ children, onClose }) {
 return (
   <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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
 );
}

function HabitLinkerCard({ habits, onAddHabit }) {
 const [selected, setSelected] = useState([]);

 const toggleHabit = (habit) => {
   if (selected.includes(habit)) {
     setSelected(selected.filter(h => h !== habit));
   } else {
     setSelected([...selected, habit]);
   }
 };

 return (
   <div>
     <h3 className="text-lg font-semibold mb-4">Select Habits</h3>
     <div className="flex flex-wrap gap-2">
       {habits.map((habit) => (
         <button
           key={habit.id}
           onClick={() => toggleHabit(habit)}
           className={`px-3 py-1 rounded-full border ${
             selected.includes(habit) ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
           }`}  
         >
           {habit.title}
         </button>
       ))}
     </div>
     <button
       onClick={() => onAddHabit(selected)}
       className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
     >
       Add Habits
     </button>
   </div>
 );
}

export default GoalsPage;
