import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import { Login } from "../index";

describe("<Login/>", () => {
  it("render success", () => {
    render(<Login />);
  });
});
