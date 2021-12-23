import { render } from "../../../test-utils";

import { Categories } from "../index";

describe("<Categories/>", () => {
  const CATEGORY = {
    slug: "abcd",
    name: "name",
  };
  it("render with props success", () => {
    const { getByText } = render(<Categories category={CATEGORY} />);
    getByText(CATEGORY.name);
  });
});
