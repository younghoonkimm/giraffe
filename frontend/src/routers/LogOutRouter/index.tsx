import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "../../pages/Login";
import CreateAccount from "../../pages/CreateAccount";
import NotFound from "../../pages/NotFound";

const LogOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default LogOutRouter;
