import axios from "axios";

// 🧠 Auto detect environment (Local vs Live)
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// 🔗 Auto select base URL based on environment
const API_BASE_URL = isLocalhost
  ? "http://localhost:5000" // 🧩 Local backend (VS terminal)
  : "https://desetplanner-backend.onrender.com"; // ☁️ Render backend (live)

// 🧩 Axios instance generator
const DataService = (type = "guest") => {
  let token = null;

  // 🧠 Token load only if user or admin login hai
  if (type === "user") {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    token = userInfo?.token || null;
  } else if (type === "admin") {
    token = localStorage.getItem("adminToken");
  }

  const headers = {
    "Content-Type": "application/json",
  };

  // 🛡️ Add Authorization header only if valid token hai
  if (token && token !== "undefined" && token !== "null") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 🧾 Debug log (optional)
  // console.log("🔗 Using API Base URL:", API_BASE_URL);

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
    withCredentials: false, // Render CORS issue fix
  });
};

export default DataService;
