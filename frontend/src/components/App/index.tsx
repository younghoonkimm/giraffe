import { useReactiveVar } from "@apollo/client";

import { isLoggedInVar } from "../../apollo";
import { LoginRouter } from "../../routers/LogInRouter";
import { LogOutRouter } from "../../routers/LogOutRouter";

// const IS_LOGGED_IN = gql`
//   query isLoggedIN {
//     isLoggedIN @Client
//   }
// `;

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoginRouter /> : <LogOutRouter />;
};
