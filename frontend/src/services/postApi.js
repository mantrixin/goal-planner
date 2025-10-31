import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
     const token = localStorage.getItem('auth_token');
     if (token) {
        config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
},

(error) => {
    return error.response.status(401).json({message: "Unauthorized"});
});

export default api;

