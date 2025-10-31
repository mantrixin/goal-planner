import { toast } from 'react-toastify';

export const handleApiError = (error) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast.error(message);
  
  if (error.response?.status === 401) {
 
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
};