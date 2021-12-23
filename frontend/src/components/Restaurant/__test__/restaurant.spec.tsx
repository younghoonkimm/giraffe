import { render } from "@testing-library/react";

import { Restaurant } from "../index";

describe("<Restaurant/>", () => {
  const testProps = {
    coverImg: "https://",
    name: "testName",
    categoryName: "categoryName",
  };

  it("redner success with props", () => {
    const { getByText } = render(<Restaurant {...testProps} />);
    getByText(testProps.name);
    getByText(testProps.categoryName);

    // expect(container.firstChild).toHaveAttribute("href", `/restaurants/${restaurantProps.id}`);
  });
});
