import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { createMockClient, MockApolloClient } from "mock-apollo-client";

import { ConfirmEmail, VERYFY_EMAIL_MUTATION } from "../index";
import { render, waitFor, RenderResult } from "../../../test-utils";
import { ME_QUERY } from "../../../hooks/useMe";
// VERYFY_EMAIL_MUTATION
const mockNavigate = jest.fn();
const mockApollo = jest.fn();
const mockGQL = jest.fn();

jest.mock("react-router-dom", () => {
  const reactRouterDom = jest.requireActual("react-router-dom");
  return {
    ...reactRouterDom,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("@apollo/client", () => {
  const apolloClient = jest.requireActual("@apollo/client");
  return {
    ...apolloClient,
    useApolloClient: () => {
      writeFragment: mockApollo;
      gql: mockGQL;
    },
  };
});

const param = "param";
const MEQUERY = {
  request: {
    query: ME_QUERY,
  },
  result: {
    data: {
      me: {
        id: 1,
        email: "",
        role: "",
        verified: true,
      },
    },
  },
};

const VERIFYMUTATION = {
  request: {
    query: VERYFY_EMAIL_MUTATION,
    variables: {
      input: {
        code: param,
      },
    },
  },
  result: {
    data: {
      verifyEmail: {
        ok: true,
        error: false,
      },
    },
  },
};
describe("<ConfirmEmail/>", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;

  beforeEach(async () => {
    const url = `http://dummy.com/code=${param}`;
    Object.defineProperty(window, "location", {
      value: {
        href: url,
      },
      writable: true,
    });
    await waitFor(async () => {
      mockClient = createMockClient();
      renderResult = render(
        <MockedProvider mocks={[MEQUERY, VERIFYMUTATION]}>
          <ConfirmEmail />
        </MockedProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Confirm Email | Giraffe");
    });
  });

  it("render success", async () => {
    const { getByText, getByPlaceholderText, debug } = renderResult;

    // const mockedMutationResponse = jest.fn().mockResolvedValue({
    //   data: {
    //     verifyEmail: {
    //       ok: true,
    //       error: "mutation error",
    //     },
    //   },
    // });
    const { ok } = VERIFYMUTATION.result.data.verifyEmail;
    const { id } = MEQUERY.result.data.me;
    // const mockFn = mockApollo({
    //   id: `User:${id + ""}`,
    //   fragment: mockGQL`
    //   fragment VerifiedUser on User {
    //     verified
    //   }
    // `,
    //   data: {
    //     verified: true,
    //   },
    // });

    // const resultMockFn = jest.fn().mockResolvedValue({
    //   data: {
    //     verifyEmail: {
    //       ok: true,
    //       error: "errorMessage",
    //     },
    //   },
    // });

    // mockClient.setRequestHandler(mockFn, resultMockFn);

    // mockClient.setRequestHandler(VERYFY_EMAIL_MUTATION, mockedMutationResponse);
    // expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      getByText("Confirming email...");
      getByText("Please wait, don't close this page");
    });

    // expect(mockNavigate).toHaveBeenCalledWith("/");
    // debug();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
