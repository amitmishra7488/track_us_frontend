import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { authContext } from "../context/context";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { useAuthentication} from  "../utils/authenticated"
import Signup from "../components/Login/Signup";
import PromotionalPage from "../components/PromotionalPage/PromotionalPage";

export default function AllRoutes() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  useAuthentication()
  
  return (
    <Routes>
      <Route path="/intro" element={<PromotionalPage />} />
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Dashboard /> : <Signup />} />
      <Route path="*" element={isLoggedIn ? <Dashboard /> : <Login />} />
    </Routes>
  );
}

