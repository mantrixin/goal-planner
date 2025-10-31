import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/postApi';

const DataResetBackup = ({ darkMode }) => {


  const handleReset = async () => {

    console.log("Resetting user data...");

      try {
        const response = await api.delete('/reset')
        if(response.data){
          console.log("User data reset successfully.")
          toast.success("User data reset successfully.")
        }
      } catch (error) {
        console.error("Error resetting user data:", error)
        toast.error("Error resetting user data.")
      }
  }



  return (
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
      <h2 className="text-xl font-medium mb-4">Data Reset & Backup</h2>
      <div className="flex gap-4">
        <button  onClick={handleReset}    className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition">
          Reset Progress
        </button>
        <button className="bg-gray-950 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition">
          Backup Progress
        </button>
      </div>
    </div>
  );
};

export default DataResetBackup;
