import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Login from "../Pages/Auth/Login";
import NoRouteMatch from "../Components/NoRouteMatch/NoRouteMatch";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/*">
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Route>
      <Route path="*" element={<NoRouteMatch />} />
    </Routes>
  );
};

export default AuthRouter;
