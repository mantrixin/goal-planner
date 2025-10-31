import React, { useState, useEffect } from "react";
import { FileDown } from "lucide-react";

import { fetchGoals } from '../../services/goalService';
import { fetchHabit } from "../../services/habitService";

const ReportsExportPage = () => {
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const habitData = await fetchHabit();
      const goalData = await fetchGoals();
      setGoals(goalData || []);
      setHabits(habitData || []);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReportData();
  }, []);


const exportReport = () => {
  window.print();
  
}



  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-950">Reports & Export</h1>
        <button  onClick={exportReport} className="px-4 py-2 bg-gray-950 hover:bg-gray-700 text-white font-medium rounded-lg flex items-center gap-2 transition">
          <FileDown size={18}/> Export Report
        </button>
      </div>

      {/* Dashboard */}
      {/* <ReportDashboard /> */}

      {/* Detailed Goal Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
  <div className="p-4 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800">
      Detailed Goal Report
    </h2>
  </div>
  {loading ? (
    <div className="p-4 text-center text-gray-500">Loading...</div>
  ) : (
    <div className="p-4 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Goal</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Progress</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Milestones</th>
          </tr>
        </thead>
        <tbody>
          {goals.length > 0 ? (
            goals.map((goal, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{goal.title}</td>
                <td className="p-3 text-gray-600">{goal.description}</td>
                <td className="p-3 text-gray-700">
                  <div className="flex relative w-2/3 h-2 bg-red-200 rounded-full">
                    <div
                      className="bg-red-500 rounded-full"
                      style={{ width: `${goal.progress}%`, height: '100%' }}
                    ></div>
                  </div>
                </td>
                <td className="p-3 text-gray-700">
                  {goal.progress > 80 ? (
                    <p className="text-green-600 font-semibold">Near Completion</p>
                  ) : (
                    <p className="text-red-600 font-semibold">Needs Attention</p>
                  )}
                </td>
                <td className="p-3 text-gray-700">
                  {goal.milestones.filter((m) => m.completed).length}/{goal.milestones.length}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>

         

      {/* Detailed Habit Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Detailed Habit Report
          </h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Habit</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Frequency</th>
                <th className="p-3 text-left">Streak</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{habit.title}</td>
                  <td className="p-3 text-violet-600 text-xs">
                    <div className="flex  items-center justify-center h-5 w-2/3 bg-gray-200 rounded-full"><p> {habit.category}</p> </div>
                    </td>
                  <td className="p-3 text-gray-700">{habit.frequency}</td>
                  <td >
                    <p className={` ${habit.streak > 3 ? 'text-green-600' : 'text-red-600'} p-3 font-semibold`}>{habit.streak} days</p>
                  </td>
                  <td>
                     {habit.streak >0 ? <p className="p-3 text-green-600 font-semibold">On Track</p> : <p className="p-3 text-red-600 font-semibold">Needs to Start</p> }
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4">
        <button onClick={exportReport} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-gray-950 transition">
          Print Report
        </button>
        <button className="px-4 py-2 bg-gray-950 hover:bg-gray-700 cursor-pointer text-white font-medium rounded-lg flex items-center gap-2 transition">
          <FileDown size={18} /> Export as PDF
        </button>
      </div>
    </div>
  );
};

export default ReportsExportPage;
