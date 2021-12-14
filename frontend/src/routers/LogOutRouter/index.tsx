import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "../../pages/Login";
import CreateAccount from "../../pages/CreateAccount";

const LogOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default LogOutRouter;
