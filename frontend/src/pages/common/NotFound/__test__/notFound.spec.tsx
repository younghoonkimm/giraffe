import { waitFor, render } from "../../../../test-utils";

import { NotFound } from "../index";

describe("<NotFound/>", () => {
  it("render success", async () => {
    render(<NotFound />);
    await waitFor(() => {
      expect(document.title).toBe("Not Found | NuerEats");
    });
  });
});
