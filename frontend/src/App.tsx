import React from "react";
import { useReactiveVar } from "@apollo/client";

import { isLoggedInVar } from "./apollo";
import LoginRouter from "./routers/LogInRouter";
import LogOutRouter from "./routers/LogOutRouter";

// const IS_LOGGED_IN = gql`
//   query isLoggedIN {
//     isLoggedIN @Client
//   }
// `;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoginRouter /> : <LogOutRouter />;
}

export default App;
