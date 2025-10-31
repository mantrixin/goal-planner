import React from 'react';
import {Smile, Cloud, Meh,Frown,Zap,Sun,Moon,Flame,Target,Coffee,Star,CheckCircle,} from 'lucide-react';

const ICON_OPTIONS = [
  { mood: 'happy', component: Smile },
  { mood: 'calm', component: Cloud },
  { mood: 'neutral', component: Meh },
  { mood: 'sad', component: Frown },
  { mood: 'anxious', component: Zap },
  { mood: 'excited', component: Sun },
  { mood: 'tired', component: Moon },
  { mood: 'angry', component: Flame },
  { mood: 'focused', component: Target },
  { mood: 'relaxed', component: Coffee },
  { mood: 'motivated', component: Star },
  { mood: 'accomplished', component: CheckCircle },
];

const ManualIconSelector = ({ selectedMood, setSelectedMood }) => {
  return (
    <div className="w-max-h">
      <h3 className="text-lg font-medium text-gray-950 mb-2">Select a Mood</h3>

      <div
        className="flex flex-wrap gap-3 justify-start max-h-40 overflow-y-auto [&::-webkit-scrollbar]:w-0.5
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" >

                    
        {ICON_OPTIONS.map(({ mood, component: Icon }) => {
          const isSelected = mood == selectedMood;

          return (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`flex flex-col items-center justify-center w-25 p-3 rounded-xl border-2 ${
                isSelected ? 'bg-gray-100 border-gray-950 text-gray-950' : 'border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer hover:shadow-sm'
              }`}
            >
              <Icon size={28} />
              <span className="text-xs mt-1 capitalize">{mood}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ManualIconSelector;
