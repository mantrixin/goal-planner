import React from 'react'
import AppRouter from './router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRouter />
    </div>
  )
}

export default App
