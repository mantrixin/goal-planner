import React from 'react';
import { X, User } from 'lucide-react';
import AuthForm from './auth-form';

const AuthModal = ({ formType, setFormType, setShowModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-95 p-8 relative">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-7 text-gray-950">
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          {formType === 'signup' ? 'Sign Up' : 'Sign In'} <User />
        </h2>

        <AuthForm formType={formType} setShowModal={setShowModal} />

        <p className="mt-4 text-sm text-gray-500 flex gap-1">
          {formType === 'signup' ? "Already have an account?" : "Don't have an account?"}
          <span 
            className="text-green-600 cursor-pointer"
            onClick={() => setFormType(formType === 'signup' ? 'signin' : 'signup')}
          >
            {formType === 'signup' ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
