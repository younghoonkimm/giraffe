import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";

import userEvent from "@testing-library/user-event";
import { CreateAccount } from "../index";
import { waitFor, render, RenderResult } from "../../../test-utils";

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
});
