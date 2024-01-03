import { useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/context";

export const useAuthentication = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // navigate("/");
    }
  }, [token, navigate, setIsLoggedIn]);
};
