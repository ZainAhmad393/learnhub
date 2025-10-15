const config = {
  // Development aur Production dono handle ho
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
};

export default config;