import React from "react";
import FFLayout from "../Components/FFLayout/FFLayout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LogoutConfirmation from "../Pages/Auth/LogoutConfirmation";
import Users from "../Pages/Users/Users";
import Species from "../Pages/Species/Species";
import NoRouteMatch from "../Components/NoRouteMatch/NoRouteMatch";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Settings from "../Pages/Settings/Settings";
import AddUser from "../Pages/Users/AddUser";
import EditUser from "../Pages/Users/EditUser";
import UsersTable from "../Pages/Users/UsersTable";
import FaunaDetailsModal from "../Pages/Species/FaunaDetailsModal";
import EditFauna from "../Pages/Species/EditFauna";
import FaunaList from "../Pages/Species/FaunaList";

const AppRouter = () => {
  let location = useLocation();

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route index element={<Navigate to="/admin" />} />
        <Route path="/auth/*">
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<LogoutConfirmation />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Route>
        <Route path="/admin/*" element={<FFLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />}>
            {/* <Route index element={<Navigate to="list" />} /> */}
            <Route path="" element={<UsersTable />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            <Route path="*" element={<Navigate to="users" />} />
          </Route>
          <Route path="species" element={<Species />}>
            {/* <Route index element={<Navigate to="species" />} /> */}
            <Route path="" element={<FaunaList />} />

            <Route path=":id" element={<FaunaDetailsModal />} />

            <Route path=":id" element={<FaunaDetailsModal />} />
            <Route path=":id/edit" element={<EditFauna />} />
            <Route path="*" element={<Navigate to="species" />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Route>
        <Route path="*" element={<NoRouteMatch />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/admin/species/:id" element={<FaunaDetailsModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
