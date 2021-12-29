import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { Restaurants } from "../../pages/client/Restaurants";
import { Header } from "../../components/Header";
import { useMe } from "../../hooks/useMe";
import { UserRole } from "../../__generated__/globalTypes";
import { ConfirmEmail } from "../../pages/common/ConfirmEmail";
import { EditProfile } from "../../pages/common/EditProfile";
import { SearchPage } from "../../pages/client/SearchPage";
import { Category } from "../../pages/client/Category";
import { Restaurant } from "../../pages/client/Restaurant";
import { MyRestaurants } from "../../pages/Owner/MyRestaurants";
import { AddRestaurant } from "../../pages/Owner/AddRestaurant";
import { MyRestaurant } from "../../pages/Owner/MyRestaurant";
import { AddDish } from "../../pages/Owner/AddDish";

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
  {
    path: "/add-restaurant",
    component: <AddRestaurant />,
  },
  {
    path: "/restaurants/:id",
    component: <MyRestaurant />,
  },
  {
    path: "/restaurants/:id/add-dish",
    component: <AddDish />,
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
