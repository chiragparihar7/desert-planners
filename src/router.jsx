import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tour from "./pages/Tour";
import ScrollToTop from "./components/ScrollToTop";
import TourDetails from "./pages/TourDetails";
import TourServiceDetails from "./pages/TourServiceDetails";
const AppRouter = () => (
  <>
   <ScrollToTop />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tours" element={<Tour />} />
    <Route path="/tours/:slug" element={<TourDetails />} />{" "}
    <Route path="/tours/:slug/:serviceSlug" element={<TourServiceDetails />} />
  </Routes>

  </>
);
export default AppRouter;
