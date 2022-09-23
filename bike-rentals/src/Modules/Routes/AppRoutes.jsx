import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp, SignIn } from "../Components/Auth/";
import Home from "../Components/Pages/Home";
import Reservations from "../Components/Pages/Reservations/";
import PrivateUserRoute from "./PrivateUserRoute";
import Account from "../Components/Pages/Account";
import PageNotFound from "../Components/Pages/NotFound/PageNotFound";
import Users from "../Components/Pages/Users";
import Admin from "../Components/Pages/Admin/Dashboard";
import { PAGE_ROUTES } from "../Constants/pageRoutes";
import { MainLayout } from "../Layouts";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { getCurrentUser } from "../Services/Apis/UserApi";
import { USER_ACCESS_TOKEN_KEY, USER_ROLES } from "../Constants/config";

const AppRoutes = () => {
  const { setUser, user } = useContext(GlobalContext);

  useEffect(() => {
    // maintain userData on page refresh
    const getUser = async () => {
      let userToken = localStorage.getItem(USER_ACCESS_TOKEN_KEY);
      if (userToken) {
        const currentUser = await getCurrentUser();
        currentUser[USER_ACCESS_TOKEN_KEY] = userToken;
        setUser(currentUser);
      }
    };
    !user._id && getUser();
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<PrivateUserRoute onlyFor={USER_ROLES.USER} />}>
            <Route path={PAGE_ROUTES.RESERVATIONS} element={<Reservations />} />
          </Route>

          <Route element={<PrivateUserRoute/>}>
            <Route path={PAGE_ROUTES.ACCOUNT} element={<Account />} />
          </Route>

          <Route element={<PrivateUserRoute onlyFor={USER_ROLES.MANAGER} />}>
            <Route path={PAGE_ROUTES.ALL_USERS} element={<Users />} />
            <Route path={PAGE_ROUTES.ADMIN} element={<Admin />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
          <Route path={PAGE_ROUTES.HOME} element={<Home />} exact />
          <Route path={PAGE_ROUTES.HOME_FILTERED} element={<Home />} exact />
          <Route path={PAGE_ROUTES.SIGNUP} element={<SignUp />} />
          <Route path={PAGE_ROUTES.LOGIN} element={<SignIn />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
