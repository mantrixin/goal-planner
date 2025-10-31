import React from 'react';

const ThemeAppearance = ({ darkMode, setDarkMode, themeColor, setThemeColor }) => {
  return (
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} space-y-4`}>
      <h2 className="text-xl font-semibold">Theme & Appearance</h2>

      <div className="flex items-center justify-between">
        <span>Dark Mode</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <div className="w-12 h-6 bg-gray-400 rounded-full peer-checked:bg-gray-600 transition-colors"></div>
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      <div className="flex justify-between items-center">
        <label>Theme Color</label>
        <select
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-950"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeAppearance;
