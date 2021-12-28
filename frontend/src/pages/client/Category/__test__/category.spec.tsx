import { createMockClient, MockApolloClient } from "mock-apollo-client";

import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { CATEGORY_QUERY } from "../index";
import { waitFor, render, RenderResult } from "../../../../test-utils";

import { Category } from "../index";
import { MockedProvider } from "@apollo/client/testing";

const mockParams = jest.fn();

jest.mock("react-router-dom", () => {
  const reactRouterDom = jest.requireActual("react-router-dom");
  return {
    ...reactRouterDom,
    useParmas: () => {
      return {
        params: mockParams,
      };
    },
  };
});

describe("<Category/>", () => {
  it("render success", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: CATEGORY_QUERY,
                variables: {
                  input: {
                    page: 1,
                    slug: "american",
                  },
                },
              },
              result: {
                data: {
                  getCategory: {
                    ok: true,
                    error: "error",
                    totalPages: 1,
                    totalResults: 6,
                    results: {
                      id: 1,
                      name: "name",
                      coverImg: "coverImg",
                      slug: "slg",
                      restaurantCount: 6,
                    },
                    restaurants: [
                      {
                        id: 1,
                        name: "name",
                        coverImg: "coverImg",
                        category: {
                          name: "categoryName",
                        },
                        address: "address",
                        isPromoted: true,
                      },
                    ],
                  },
                },
              },
            },
          ]}
        >
          <Category />
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(document.title).toBe("Category | Giraffe");
    });
  });
});
