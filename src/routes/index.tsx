// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import InfiniteScroll from "../pages/InfiniteScroll";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/infinite-scroll" element={<InfiniteScroll />} />
    </Routes>
  );
}
