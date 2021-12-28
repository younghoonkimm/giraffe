import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Restaurants from "../../pages/Restaurants";
import { Header } from "../../components/Header";
import { useMe } from "../../hooks/useMe";
import { UserRole } from "../../__generated__/globalTypes";
import { ConfirmEmail } from "../../pages/ConfirmEmail";
import EditProfile from "../../pages/EditProfile";
import SearchPage from "../../pages/SearchPage";
import { Category } from "../../pages/Category";
import Restaurant from "../../pages/Restaurant";
import { MyRestaurants } from "../../pages/MyRestaurants";

const commonRoutes = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
];

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <SearchPage />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurants/:id",
    component: <Restaurant />,
  },
];

const ownerRoutes = [
  {
    path: "/",
    component: <MyRestaurants />,
  },
];

export const LoginRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        {data.me.role === UserRole.Client &&
          clientRoutes.map((route: any) => <Route key={route.path} path={route.path} element={route.component} />)}
        {data.me.role === UserRole.Owner &&
          ownerRoutes.map((route: any) => <Route key={route.path} path={route.path} element={route.component} />)}
        {commonRoutes.map((route: any) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
      </Routes>
    </Router>
  );
};
