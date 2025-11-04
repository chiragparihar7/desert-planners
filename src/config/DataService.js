// config/DataService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const DataService = (type = "user") => {
  // ✅ Choose token based on type (user or admin)
  const token =
    type === "admin"
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("userToken");

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    withCredentials: true,
  });
};

export default DataService;
