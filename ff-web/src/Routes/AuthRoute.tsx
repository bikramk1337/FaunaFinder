import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { selectIsLoggedIn } from "../Redux/Slices/authSlice";
import useAuth from "../Hooks/useAuth";

type Props = {
  children: ReactElement;
};

const AuthRoute = (props: Props) => {
  const { children } = props;
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default AuthRoute;
