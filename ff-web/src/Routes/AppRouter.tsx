import React from "react";
import FFLayout from "../Components/FFLayout/FFLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import LogoutConfirmation from "../Pages/Auth/LogoutConfirmation";
import Users from "../Pages/Users/Users";
import UsersGeneral from "../Pages/Users/UsersGeneral";
import UsersAdmin from "../Pages/Users/UsersAdmin";
import Species from "../Pages/Species/Species";
import NoRouteMatch from "../Components/NoRouteMatch/NoRouteMatch";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Settings from "../Pages/Settings/Settings";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*">
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<LogoutConfirmation />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Route>
      <Route path="/admin/*" element={<FFLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />}>
          <Route index element={<Navigate to="general" />} />
          <Route path="general-users" element={<UsersGeneral />} />
          <Route path="admin-users" element={<UsersAdmin />} />
          <Route path="*" element={<Navigate to="general-users" />} />
        </Route>
        <Route path="species" element={<Species />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
      <Route path="*" element={<NoRouteMatch />} />
    </Routes>
  );
};

export default AppRouter;
