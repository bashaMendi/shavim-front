import axios from 'axios';

/**
 * Axios client לשימוש בכל קריאות ה-API
 */
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true, // עבור cookies אם דרוש
});

// Interceptor לבקשות: הוספת JWT מטוקן מאחסון לוקלי
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined' && config.headers) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor לתגובות: טיפול גלובלי בשגיאות
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // ניתן להוסיף כאן ניתוב לעמוד כניסה ב-401, הצגת הודעות ועוד
    return Promise.reject(error);
  }
);

export default axiosClient;
