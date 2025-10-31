import React, { useState, useEffect } from 'react';
import { Trophy, Check, Box, PartyPopper } from 'lucide-react';
import { updateGoal } from '../../../services/goalService';

const GoalCard = ({
  _id,
  title,
  description,
  milestones: initialMilestones = [],
  progress: initialProgress = 0,
  onSelect,
  onUpdate,
}) => {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [celebration, setCelebration] = useState(false);
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    setMilestones(initialMilestones);
    setProgress(initialProgress);
  }, [initialMilestones, initialProgress]);

  const toggleMilestone = async (index) => {
    const updatedMilestones = milestones.map((m, i) =>
      i === index ? { ...m, completed: !m.completed } : m
    );
    setMilestones(updatedMilestones);

   
    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const newProgress = milestones.length === 0 ? 0 : Math.round((completedCount / milestones.length) * 100);
    setProgress(newProgress);

    if (!milestones[index].completed && newProgress === 100) {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 2000);
    }


    try {
      const updated = await updateGoal(_id, {
        milestones: updatedMilestones,
        progress: newProgress
      });
      if (updated && onUpdate) {
        onUpdate(updated);
      }
    } catch (error) {
      console.error('Failed to update milestone:', error);

      setMilestones(initialMilestones);
      setProgress(initialProgress);
    }
  };

  const completedCount = milestones.filter((m) => m.completed).length;

  return (
    <div onClick={onSelect} className={`relative bg-white rounded-xl border border-gray-200 p-6 space-y-4 overflow-y-auto h-65 cursor-pointer  [&::-webkit-scrollbar]:w-0
                                        [&::-webkit-scrollbar-track]:bg-gray-100
                                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
    >
      
      {celebration && (
        <div className="absolute inset-0 flex h-full justify-center items-center bg-white/20 backdrop-blur rounded-xl animate-fadeIn">
          <div className="flex flex-col items-center gap-2 text-green-700">
            <PartyPopper className="w-12 h-12 text-green-500 animate-bounce" />
            <p className="text-2xl font-semibold">Goal Completed </p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="rounded-full p-4 bg-gray-100">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <div>
            <div className="text-green-600 font-semibold">Goal</div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <div className="text-md text-orange-600 font-semibold mt-2">
              Goal Description
            </div>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        </div>
      </div>
     
      <div className="bg-gray-200 rounded-full h-4">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-right text-md text-gray-950 font-medium">
        {Math.round(progress)}% Completed
      </p>
    
      {milestones && milestones.length > 0 ? (
        milestones.map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            <button   
              onClick={(e) => {   
                e.stopPropagation();  
                toggleMilestone(i); 
              }}
              className={`p-1 rounded-full focus:outline-none border-2 transition ${
                m.completed   
                  ? 'border-green-500 bg-green-100' 
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              {m.completed ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Box className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <span className={m.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
              {m.text || m.milestonesName}
            </span>           
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400 italic">No milestones yet</p>
      )}
    </div>
  );
};

export default GoalCard;
