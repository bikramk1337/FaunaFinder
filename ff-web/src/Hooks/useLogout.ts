import { useDispatch } from "react-redux";
import { userApi } from "../Redux/Services/userService";
import { setIsLoggedOut } from "../Redux/Slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userApi.util.resetApiState());
    dispatch(setIsLoggedOut());
  };
  return handleLogout;
};
