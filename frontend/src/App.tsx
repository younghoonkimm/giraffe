import { useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import LoggedOutRouter from "./routers/LoggedOutRouter";

// const IS_LOGGED_IN = gql`
//   query isLoggedIN {
//     isLoggedIN @Client
//   }
// `;

import { isLoggedInVar } from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn && <LoggedOutRouter></LoggedOutRouter>;
}

export default App;
