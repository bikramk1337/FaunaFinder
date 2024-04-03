import React from "react";
import { useAuth } from "../Hooks";
import AppRouter from "./AppRouter";
import AuthRouter from "./AuthRouter";

const RootRouter = () => {
  const isAuthenticated = useAuth();
  if (isAuthenticated) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
};

export default RootRouter;
