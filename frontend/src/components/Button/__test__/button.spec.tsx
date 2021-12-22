import { render, waitFor } from "@testing-library/react";

import { Button } from "../index";

describe("<Button/>", () => {
  const CLICK = "click";
  const LOADINGTEXT = "Loading...";

  it("should render success with props", () => {
    const { getByText } = render(<Button canClick={true} buttonType="button" loading={false} actionText={CLICK} />);
    getByText(CLICK);
    // debug();
    // rerender(<Button canClick={true} buttonType="button" loading={true} actionText={CLICK} />);
    // debug();
    // getByText(LOADINGTEXT);
  });
  it("shoud display loading", () => {
    const { debug, getByText, container } = render(
      <Button canClick={false} buttonType="button" loading={true} actionText={CLICK} />
    );

    getByText(LOADINGTEXT);
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
