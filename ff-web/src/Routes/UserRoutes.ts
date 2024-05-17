import { IRoute } from "../Types";

export const userTabRoutes: IRoute[] = [
  {
    name: "General",
    path: "/admin/users/general-users",
  },
  {
    name: "Admin",
    path: "/admin/users/admin-users",
  },
];

export const userRoutes: IRoute[] = [
  ...userTabRoutes,
  { name: "addUser", displayName: "Add User", path: "/admin/users/add-user" },
  {
    name: "editUser",
    displayName: "Edit User",
    path: "/admin/users/edit-user/:id",
  },
];
