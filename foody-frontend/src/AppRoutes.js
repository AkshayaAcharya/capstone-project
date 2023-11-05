import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RestaurantMain from "./pages/Restaurant/RestaurantMain";
import LoginRestaurant from "./pages/Restaurant/LoginRestaurant";
import RegisterRestaurant from "./pages/Restaurant/RegisterRestaurant";
import RestaurantHome from "./pages/Restaurant/RestaurantHome";
import UserLogin from "./pages/User/UserLogin";
import UserRegister from "./pages/User/UserRegister";
import UserHome from "./pages/User/UserHome";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants" element={<RestaurantMain />} />
      <Route path="/restaurantLogin" element={<LoginRestaurant />} />
      <Route path="/restaurantSignup" element={<RegisterRestaurant />} />
      <Route path="/restaurant" element={<RestaurantHome />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserRegister />} />
      <Route path="/user" element={<UserHome />} />
    </Routes>
  );
}
