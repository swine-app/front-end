import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect } from 'react';
import AuthContext from "./context/AuthProvider";
import SideBarLayout from "./layouts/SideBarLayout";

export default function Root() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return <SideBarLayout><Outlet /></SideBarLayout>;
}
