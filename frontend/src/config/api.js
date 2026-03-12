// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app'  // Replace with your deployed backend URL
  : 'http://localhost:5000';

export default API_BASE_URL;