import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import {
  selectIsLoggedIn,
  setIsLoggedIn,
  setIsLoggedOut,
} from "../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  useEffect(() => {
    const isLoggedInSaved = localStorage.getItem("isLoggedIn");
    if (isLoggedInSaved === "true") {
      dispatch(setIsLoggedIn());
    } else {
      dispatch(setIsLoggedOut());
    }
  }, []);

  const logOut = () => {
    try {
      localStorage.setItem("isLoggedIn", "false");
      dispatch(setIsLoggedOut());
      navigate("/auth");
    } catch (e) {
      console.log(e);
    }
  };

  const login = () => {
    try {
      localStorage.setItem("isLoggedIn", "true");
      dispatch(setIsLoggedIn());
      navigate("/admin");
    } catch (e) {
      console.log(e);
      logOut();
    }
  };

  return { isLoggedIn, login, logOut };
};

export default useAuth;
