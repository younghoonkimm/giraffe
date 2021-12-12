import React from "react";
import { useReactiveVar } from "@apollo/client";

import { isLoggedInVar } from "./apollo";
import LoggedInRouter from "./routers/LoggedInRouter";
import LoggedOutRouter from "./routers/LoggedOutRouter";

// const IS_LOGGED_IN = gql`
//   query isLoggedIN {
//     isLoggedIN @Client
//   }
// `;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
