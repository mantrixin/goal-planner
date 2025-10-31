import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify';

const AuthForm = ({ formType, setShowModal }) => {
  const [title, settitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const API_BASE = 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (formType === 'signup' && !title)) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const endpoint = formType === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const payload = formType === 'signup' ? { title, email, password } : { email, password };
      const res = await axios.post(`${API_BASE}${endpoint}`, payload);
    
      const { token, user } = res.data.data || {};
      if (token) localStorage.setItem('auth_token', token);
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));

      toast.success(`Successfully ${formType === 'signup' ? 'registered' : 'logged in'}`);

      setShowModal(false);
      settitle(''); setEmail(''); setPassword('');
      navigate('/dashboard-homepage');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
      {formType === 'signup' && (
        <input 
          type="text" 
          placeholder="Full Name" 
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2"
        />
      )}
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg focus:outline-none focus:ring-2"
      />

      <button 
        type="submit" 
        className="py-3 bg-gray-950 text-white font-bold rounded-lg hover:bg-gray-800 cursor-pointer transition flex justify-center items-center"
      >
        {loading ? <div className="w-4 h-4 rounded-full animate-spin"></div> : (formType === 'signup' ? 'Sign Up' : 'Sign In')}
      </button>
    </form>
  );
};

export default AuthForm;
