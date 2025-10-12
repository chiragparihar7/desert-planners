import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tour from "./pages/Tour";


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tours" element={<Tour />} />
  </Routes>
);
export default AppRouter;
