import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { USER_ACCESS_TOKEN_KEY } from "../Constants/config";
import { GlobalContext } from "../Context/GlobalState";

const PrivateUserRoute = ({ onlyFor = false }) => {
  const { user } = useContext(GlobalContext);
  const [authCheck, setAuthCheck] = useState({});

  useEffect(() => {
    const roleCheck = onlyFor ? onlyFor === user?.role : true;
    const data = localStorage.getItem(USER_ACCESS_TOKEN_KEY) && roleCheck;
    setAuthCheck(data);
  }, [user]);

  return <>{authCheck ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default PrivateUserRoute;
