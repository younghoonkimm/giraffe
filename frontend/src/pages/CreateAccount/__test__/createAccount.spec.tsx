import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";

import userEvent from "@testing-library/user-event";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../index";
import { waitFor, render, RenderResult } from "../../../test-utils";
import { UserRole } from "../../../__generated__/globalTypes";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const reactRouterDom = jest.requireActual("react-router-dom");
  return {
    ...reactRouterDom,
    useNavigate: () => mockNavigate,
  };
});

describe("<CreateAccount/>", () => {
  let mockClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => expect(document.title).toBe("Create Account | Giraffe"));
  });

  it("validate form error", async () => {
    const { getByText, getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByText("Create Account");

    await waitFor(() => {
      userEvent.type(email, "abc.dom");
    });

    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Please enter valid email/i);

    await waitFor(() => {
      userEvent.clear(email);
    });

    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);

    await waitFor(() => {
      userEvent.type(email, "kxkm05@nave.com");
      userEvent.click(submitBtn);
    });

    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });
  it("submits mutation with from values", async () => {
    const { getByText, getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByText("Create Account");
    const formData = {
      email: "abcd@nate.com",
      password: "sdfsdfsfs@@",
      role: UserRole.Client,
    };

    const mockedLoginMutation = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "errorMessage",
        },
      },
    });

    mockClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedLoginMutation);
    // jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedLoginMutation).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutation).toHaveBeenCalledWith({
      createAccountInput: {
        ...formData,
      },
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
    const mutationError = getByRole("alert");
    expect(mutationError).toHaveTextContent("errorMessage");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
