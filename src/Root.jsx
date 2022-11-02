import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect } from 'react';
import AuthContext from "./context/AuthProvider";
import SideBarLayout from "./layouts/SideBarLayout";

export default function Root() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.debug(location.pathname)
    if(!auth && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [auth, navigate, location.pathname]);

  return <SideBarLayout><Outlet /></SideBarLayout>;
}
