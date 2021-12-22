import { render, waitFor } from "@testing-library/react";
import React from "react";
import { isLoggedInVar } from "../../../apollo";
import { App } from "../index";

jest.mock("../../../routers/LogOutRouter", () => {
  return {
    LogOutRouter: () => <span>LogOutRouter</span>,
  };
});
jest.mock("../../../routers/LoginRouter", () => {
  return {
    LoginRouter: () => <span>LoginRouter</span>,
  };
});

describe("<App/>", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(<App />);
    getByText("LogOutRouter");
  });
  it("renders LoggedInRouter", async () => {
    const { getByText, debug } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText("LoginRouter");
  });
});
