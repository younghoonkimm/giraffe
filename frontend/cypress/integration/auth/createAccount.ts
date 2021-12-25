describe("Create Account", () => {
  const user = cy;
  it("should see validate error", () => {
    user.visit("/");
    user.findByText("Create account").click();
    user.visit("/create-accoun").title().should("eq", "Create Account | Giraffe");
  });
  it("should see create-account page", () => {});
});
