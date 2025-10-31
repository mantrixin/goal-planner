import React from 'react';
import DailyMoodLogger from '../../component/mood-tracker-component/mood-logger';

const MoodTracker = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4 flex flex-col space-y-6">
      
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-950">Mood & Habit Tracker</h1>
      </header>

  
      <div className="flex-1 w-full">
        <DailyMoodLogger />
      </div>
    </div>
  );
};

export default MoodTracker;
