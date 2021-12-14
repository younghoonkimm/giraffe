import { gql, useQuery } from "@apollo/client";
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

const LoginRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  console.log(data, loading);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>{data.me.email}</h1>
    </div>
  );
};

export default LoginRouter;
