import React from 'react';
import { AwardIcon } from "lucide-react";

const StreaksCard = ({ habits }) => {
  return (
    <div>
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 flex flex-col gap-3 h-70 overflow-y-auto 
        [&::-webkit-scrollbar]:w-0
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <AwardIcon size={20} className="text-yellow-500" /> Milestones
        </h1>

        {habits.length === 0 ? (
          <p className="text-gray-500">No milestones yet. Start building your streaks!</p>
        ) : (
          <>
            {habits.map((habit) => (
              <div
                key={habit.id || habit._id}
                className={`flex gap-2 items-center px-4 py-2 rounded-full font-semibold ${
                  habit.streak >= 4
                    ? "bg-green-200 text-green-800"
                    : habit.streak >= 3
                    ? "bg-blue-200 text-blue-800"
                    : "bg-yellow-200 text-yellow-600"
                }`}
              >
                <AwardIcon size={18} /> {habit.title} — {habit.streak} Day Streak
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default StreaksCard;
