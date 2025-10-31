import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_PAGES } from "../../../router/data";
import { DoorOpen, User } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <motion.div
      className="w-20 sm:w-28 md:w-35 lg:w-64 h-full bg-gray-950 sticky text-white flex flex-col p-2 sm:p-4"
    >
    
      <motion.div
        className="mb-4 flex items-center justify-center sm:justify-start"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-green-400 text-2xl font-bold sm:mr-1">G</h1>
        <h1 className="text-white text-2xl font-bold hidden sm:block">Goal Planner</h1>
      </motion.div>

      
      <nav className="flex-1">
        <div className="uppercase text-xs text-gray-400 mb-2 font-semibold hidden sm:block">
          Overview
        </div>

        {APP_PAGES.map((item, index) => (
          <motion.div
            key={item.link}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center px-2 sm:px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ease-in-out my-1 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700/50"
                }`
              }
            >
              {item.icon && (
                <item.icon className="w-5 h-5 sm:mr-3" />
              )}
              <span className="hidden sm:block">{item.title}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      
      <motion.div
        className="mt-auto border-t border-gray-700 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {user ? (
          <>
            <div 
              onClick={handleLogout}
              className="flex items-center p-2 sm:p-3 rounded-lg transition ease-in-out hover:bg-gray-700/50 cursor-pointer mb-3"
            >
              <DoorOpen className="w-5 h-5 sm:mr-3" />
              <span className="hidden sm:block">Log out</span>
            </div>

            <div className="flex items-center p-2 sm:p-3 bg-gray-800 rounded-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-2 sm:mr-3 text-xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="font-semibold text-sm">{user.title}</span>
                   <span className="text-xs text-green-400">Active Now</span>
              </div>
            </div>
          </>
        ) : (
          <div 
            className="flex items-center p-2 sm:p-3 rounded-lg transition ease-in-out hover:bg-gray-700/50 cursor-pointer"
          >
            <User className="w-5 h-5 sm:mr-3" />
          <span className="hidden sm:block text-white font-semibold relative pb-1">
          Log in to Proceed
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 rounded-full"></span>
          </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
