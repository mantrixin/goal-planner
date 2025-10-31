import React, { useState } from 'react';
import AuthModal from '../../component/onboarding-page';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const OnboardingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('signup');
  const navigate = useNavigate();

  const storedUsers = localStorage.getItem('auth_user');
  const user = storedUsers ? JSON.parse(storedUsers) : null;

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    navigate('/');
  };


  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      className="h-168 w-full bg-[url('/bg-image.png')] bg-cover bg-center text-gray-950 px-12 py-15"
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full">

   
        <motion.div
          className="flex flex-col justify-start space-y-4"
          variants={fadeUp}
        >
          <motion.h1 className="text-xl font-bold uppercase" variants={fadeUp}>
            Onboarding & Setup
          </motion.h1>

          <motion.div
            className="p-8 bg-white border border-gray-300 rounded-xl flex flex-col gap-4"
            variants={fadeUp}
          >
            <h2 className="text-5xl font-extrabold text-green-950">
              {user ? `Welcome back, ${user.name}!` : 'Welcome to Goal Planner!'}
            </h2>
            <p className="text-xl leading-relaxed">
              Let's get you set up to achieve your dreams. We'll help to track{' '}
              <strong>habits</strong>, manage <strong>goals</strong>, and
              monitor your <strong>progress</strong>.
            </p>
          </motion.div>
        </motion.div>

  
        <motion.div
          className="flex flex-col items-center justify-end relative space-y-4"
          variants={fadeUp}
        >

          <motion.div
            className="relative w-full max-w-sm h-110 bg-[url('/man-up.png')] border border-gray-300 bg-cover bg-center rounded-2xl"
            variants={imageVariant}
          ></motion.div>

          <motion.button
            onClick={() =>
              !user
                ? (setShowModal(true), setFormType('signup'))
                : handleLogout()
            }
            className="w-60 py-3 text-2xl font-bold rounded-full text-white cursor-pointer transition bg-gray-950"
            variants={fadeUp}
          >
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <LogOutIcon size={25} /> Log Out
              </div>
            ) : (
              'Get Started'
            )}
          </motion.button>

       
          <motion.div
            className="flex flex-col gap-2 w-60 text-gray-600"
            variants={fadeUp}
          >
            {!user && (
              <div className="flex gap-1">
                <h1>Already have an account?</h1>
                <span
                  onClick={() => {
                    setShowModal(true);
                    setFormType('signin');
                  }}
                  className="text-green-600 cursor-pointer"
                >
                  Sign In
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>


      {showModal && (
        <AuthModal 
          formType={formType} 
          setFormType={setFormType} 
          setShowModal={setShowModal} 
        />
      )}
    </motion.div>
  );
};

export default OnboardingPage;
