import React, { useState, useEffect } from 'react';
import ThemeAppearance from '../../component/setting-page/theme';
import HabitCategories from '../../component/setting-page/habit-categories';
import DataResetBackup from '../../component/setting-page/reset-backup';
import { fetchHabit, deleteHabit } from '../../services/habitService';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHabits = await fetchHabit(); 
      setHabits(fetchedHabits);
    };
    fetchData();
  }, []);

  const handleDeleteHabit = async (habitId) => {
    await deleteHabit(habitId);
    setHabits((prevHabits) => prevHabits.filter(habit => habit._id !== habitId));
  };

  const handleUpdatedHabit = (updatedHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit._id === updatedHabit._id ? updatedHabit : habit
      )
    );
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-950'} space-y-8`}>
      <h1 className="text-3xl font-bold">Settings & Personalization</h1>
      <ThemeAppearance darkMode={darkMode} setDarkMode={setDarkMode}/>
      <HabitCategories
        darkMode={darkMode}
        habits={habits}
        deleteHabit={handleDeleteHabit}
        handleUpdatedHabit={handleUpdatedHabit}
      />
      <DataResetBackup darkMode={darkMode} />
    </div>
  );
};

export default SettingsPage;
