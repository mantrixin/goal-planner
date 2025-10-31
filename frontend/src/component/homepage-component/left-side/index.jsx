import { AwardIcon, BookOpen, CalendarCheckIcon, FlameIcon, TargetIcon, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchGoals } from '../../../services/goalService';
import { fetchHabit } from '../../../services/habitService';

const SummarySection = () => {
  const [stats, setStats] = useState({
    completedHabits: 0,
    completedGoals: 0,
    maxStreak: 0,
    totalHabits: 0,
    totalGoals: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const [habits, goals] = await Promise.all([fetchHabit(), fetchGoals()]);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const pastMonthHabits = habits.filter(habit => new Date(habit.createdAt) >= thirtyDaysAgo);
      const pastMonthGoals = goals.filter(goal => new Date(goal.createdAt) >= thirtyDaysAgo);

      const completedHabits = pastMonthHabits.filter(habit => habit.isCompleted).length;
      const totalHabits = habits.length;
      const maxStreak = Math.max(...habits.map(habit => habit.streak));
      const completedGoals = pastMonthGoals.filter(goal => goal.progress === 100).length;
      const totalGoals = goals.length;

      setStats({
        completedHabits,
        completedGoals,
        maxStreak,
        totalHabits,
        totalGoals,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDashboardStats();
  }, []);

  const habitProgress = stats.totalHabits
    ? (stats.completedHabits / stats.totalHabits) * 100
    : 0;
  const goalProgress = stats.totalGoals
    ? (stats.completedGoals / stats.totalGoals) * 100
    : 0;

  return (
    <div className="w-3/7 h-165 grid grid-rows-2 gap-2">
 
      <div className="h-[96%] w-full rounded-2xl bg-white px-5 py-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={22} />
            <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
          </div>
          <span className="text-sm text-gray-500 font-medium">This Month</span>
        </div>

        <div className="h-[87%] w-full rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:ring-2 hover:ring-blue-950">
          {loading ? (
            <p className="text-gray-400 text-sm italic">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full px-4">
              <div className="space-y-2 bg-blue-200 p-4 rounded-lg">
                <h3 className="flex items-center text-xl font-semibold text-blue-900 gap-2">
                  <CalendarCheckIcon size={20} /> Habits
                </h3>
                <p className="flex items-center justify-center text-blue-900 text-4xl font-bold">
                  {stats.completedHabits}/{stats.totalHabits}
                </p>
                <p className="flex items-center justify-center text-blue-900 font-medium mb-2">
                  Completed
                </p>
              </div>

              <div className="space-y-2 bg-green-200 p-4 rounded-lg">
                <h3 className="flex items-center text-xl font-semibold text-green-900 gap-2">
                  <TargetIcon size={20} /> Goals
                </h3>
                <p className="flex items-center justify-center text-green-900 text-4xl font-bold">
                  {stats.completedGoals}/{stats.totalGoals}
                </p>
                <p className="flex items-center justify-center text-green-900 font-medium mb-2">
                  Completed
                </p>
              </div>

              <div className="w-full col-span-2 bg-yellow-100 p-3 rounded-lg">
                <h1 className="flex items-center justify-center text-lg font-medium text-yellow-700">
                  <AwardIcon size={20} /> Max Habit Streak: {stats.maxStreak} Days
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[96%] w-full rounded-2xl bg-white px-5 py-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-teal-600" size={22} />
            <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
          </div>
          <span className="text-sm text-gray-500 font-medium">This month</span>
        </div>

        <div className="h-[87%] w-full rounded-xl border border-gray-200 hover:ring-2 hover:ring-blue-950 flex flex-col justify-center gap-2 px-6 py-4">
          {loading ? (
            <p className="text-gray-400 text-sm italic text-center">Loading...</p>
          ) : (
            <>
             
              <div>
                <p className="flex items-center gap-2 text-gray-950 mb-2 font-medium"> <CalendarCheckIcon className="text-blue-900" size={20}/>Habits Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="h-6 bg-gradient-to-r from-indigo-400 to-indigo-700 rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${habitProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {Math.round(habitProgress)}%
                </p>
              </div>

          
              <div>
                <p className="flex items-center gap-2 text-gray-950 mb-3 font-medium">
                  <TargetIcon className="text-teal-600" size={20} /> Goals Progress
                </p>
                <div className="relative w-full bg-gray-200 rounded-full h-6 shadow-inner">
                  <div
                    className="h-6 bg-gradient-to-r from-green-400 via-teal-500 to-teal-700 rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                  <span className="absolute inset-0 flex justify-center items-center text-xs font-semibold text-white drop-shadow-sm">
                    {Math.round(goalProgress)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic text-center">
                  {goalProgress >= 100
                    ? `${<TargetIcon className="text-teal-600" size={18} />} Goal Mastered!`
                    : goalProgress >= 75
                    ? `${<FireIcon className="text-teal-600" size={18} />} Almost there!`
                    : goalProgress >= 50
                    ? `${<MuscleIcon className="text-teal-600 text-lg" size={18} />} Keep pushing!`
                    : <p className='text-lg'> Great start!</p>}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
