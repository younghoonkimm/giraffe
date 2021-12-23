import { render } from "@testing-library/react";

import { FormError } from "../index";

describe("<FormError/>", () => {
  const TESTCODE = "test";
  it("render with props success", () => {
    const { getByText } = render(<FormError errorMessage={TESTCODE} />);
    getByText(TESTCODE);
  });
});
