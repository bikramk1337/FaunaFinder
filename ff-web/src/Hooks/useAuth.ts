import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { selectIsLoggedIn, setIsLoggedIn } from "../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogout } from "./useLogout";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleLogout = useLogout();

  useEffect(() => {
    (async () => {
      try {
        const token = await localStorage.getItem("token");
        if (token) {
          dispatch(setIsLoggedIn(token));
        } else {
          handleLogout();
        }
      } catch (error) {
        console.log("localstorage could not be accessed");
      }
    })();
  }, []);

  const isAuthenticated = useSelector((state: RootState) =>
    selectIsLoggedIn(state)
  );

  return isAuthenticated;
};
