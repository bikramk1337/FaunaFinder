import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Auth/Register";
import FFLayout from "./Components/FFLayout/FFLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";
import NoRouteMatch from "./Components/NoRouteMatch/NoRouteMatch";
import Login from "./Pages/Auth/Login";
import { AuthRoute } from "./Routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*">
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <AuthRoute>
              <FFLayout />
            </AuthRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NoRouteMatch />} />
      </Routes>
    </Suspense>
  );
}

export default App;
