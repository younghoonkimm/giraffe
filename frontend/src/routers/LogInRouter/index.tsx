import { gql, useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Restaurants from "../../pages/Restaurants";
import Header from "../../components/Header";
import { UserRole } from "../../__generated__/globalTypes";
import { meQuery } from "../../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/",
    component: <Restaurants />,
  },
];

const LoginRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  console.log(data?.me.role === "Client", loading);
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
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default LoginRouter;
