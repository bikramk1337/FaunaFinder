import React, { ReactElement, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { selectIsLoggedIn } from "../Redux/Slices/authSlice";

type Props = {
  children: ReactElement;
};

const AuthRoute = (props: Props) => {
  const { children } = props;
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }
  return children;
};

export default AuthRoute;
