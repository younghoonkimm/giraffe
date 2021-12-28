import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "../../pages/common/Login";
import { CreateAccount } from "../../pages/common/CreateAccount";
import { NotFound } from "../../pages/common/NotFound";

export const LogOutRouter = () => {
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
