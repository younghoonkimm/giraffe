import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { verifyEmail, verifyEmailVariables } from "../../__generated__/verifyEmail";
import { useMe } from "../../hooks/useMe";

const VERYFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const navigate = useNavigate();

  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData?.me.id + ""}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      navigate("/");
    }
  };

  const [verifyEmail, { loading: verifyingEmail }] = useMutation<verifyEmail, verifyEmailVariables>(
    VERYFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");

    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">Please wait, don't close this page</h4>
    </div>
  );
};

export default ConfirmEmail;
