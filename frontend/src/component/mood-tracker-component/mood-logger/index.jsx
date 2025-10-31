import React, { useState, useEffect } from 'react';
import { Smile, CheckCircle, Trash2 } from 'lucide-react';
import { MOOD_DATA } from './data';
import MoodSelector from '../mood-selector';
import { toast } from 'react-toastify';
import { fetchMood, createMood, deleteData } from '../../../services/moodService';
import { fetchHabit } from '../../../services/habitService';

const DailyMoodLogger = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [allHabits, setAllHabits] = useState([]);
  const [logs, setLogs] = useState([]);
  const [todaysMood, setTodaysMood] = useState(null);


  useEffect(() => {
    const loadMoods = async () => {
      try {
        const data = await fetchMood();
        setLogs(data);
        const today = new Date().toDateString();
        const todayLog = data.find(log => new Date(log.date).toDateString() === today);
        if (todayLog) setTodaysMood(todayLog);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }

      try {
        const habitslist = await fetchHabit();
        setAllHabits(habitslist)
        toast.success("Habits are Loaded Successfully From Database")
      } catch (error) {
        console.error("Habit not Found")
      }


    };
    loadMoods();
  }, []);

  const handleDeleteMood = async (id) => {
    try {
      await deleteData(id);
      setLogs(prev => prev.filter(log => log._id !== id));

      const today = new Date().toDateString();
      if (todaysMood && new Date(todaysMood.date).toDateString() === today) {
        setTodaysMood(null);
      }

      toast.success('Mood deleted successfully');
    } catch (error) {
      console.error("Error deleting mood:", error);
      toast.error('Failed to delete mood');
    }
  };

  const handleHabitToggle = (habit) => {
    setSelectedHabits(prev =>
      prev.includes(habit) ? prev.filter(h => h !== habit) : [...prev, habit]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast.warning('Please select a mood');
      return;
    }

    const moodData = {
      mood: selectedMood.toLowerCase(),
      habits: selectedHabits,
      date: new Date().toISOString(),
    };

    try {
      const createdMood = await createMood(moodData);
      if (createdMood) {
        setLogs([createdMood]);
        setTodaysMood(createdMood);
      }
      toast.success('Mood logged successfully');
    } catch (error) {
      console.error("Error logging mood:", error);
      toast.error('Failed to log mood');
    }

    setSelectedMood('');
    setSelectedHabits([]);
  };

  const moodData = MOOD_DATA[selectedMood] || { color: 'bg-gray-300', icon: Smile };
  const SelectedMoodIcon = moodData.icon;

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full h-full">
      <h2 className="text-2xl text-gray-950 font-semibold mb-6 border-b border-gray-200 pb-2">
        Daily Mood Check-In
      </h2>

      <div className="flex flex-row h-full gap-6">
        <div className="flex flex-col items-center justify-center w-70">
          <div className={`flex items-center justify-center p-6 rounded-full ${moodData.color}`}>
            <SelectedMoodIcon size={82} className="text-white" />
          </div>
          <p className="text-xl font-medium text-gray-950 capitalize">{selectedMood}</p>
        </div>

        <div className="flex flex-col max-w-1/2">
          <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
        </div>

        <div className="w-1/3 border-l-2 px-6 border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium text-gray-950 mb-4">Habits Today</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {allHabits.map(habit => (
              <button
                key={habit._id || habit.id}
                className={`px-3 py-2 text-sm rounded-full ${
                  selectedHabits.includes(habit.title)
                    ? 'bg-gray-950 text-white'
                    : 'bg-gray-100 text-gray-950 hover:bg-gray-200'
                }`}
                onClick={() => handleHabitToggle(habit.title)}
              >
                {habit.title}
              </button>
            ))}
          </div>

          {todaysMood ? (
            <p className="text-sm text-gray-600 mb-2">You've already logged your mood for today</p>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-3/4 py-3 bg-gray-950 text-white rounded-xl font-semibold cursor-pointer flex items-center justify-center hover:bg-gray-800"
            >
              <CheckCircle size={18} className="inline mr-2" />
              Log Mood
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-semibold mb-4">Mood Log Timeline</h1>
        {logs.length > 0 ? (
          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id } className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-950">
                <div className="flex justify-between items-start">
                  <div>
                    <p>Date: {new Date(log.date).toLocaleDateString()}</p>
                    <p>Mood: {log.mood}</p>
                    <p>Habits: {log.habits.join(', ')}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMood(log.id || log._id)}
                    className="text-red-500 hover:text-red-600 p-1"
                    title="Delete mood"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No mood logs found</p>
        )}
      </div>
    </div>
  );
};

export default DailyMoodLogger;
