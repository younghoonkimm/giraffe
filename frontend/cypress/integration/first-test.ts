describe("Login page", () => {
  const user = cy;
  it("should see login page", () => {
    user.visit("/").title().should("eq", "Login | Giraffe");
  });
  it("can fill out the form", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("bad@email");
    user.findByRole("alert").should("have.text", "Please enter valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByPlaceholderText(/email/i).type("bad@email.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "password is required");
  });

  //to do login
});
it("can see email / pw validation error", () => {
  // user
  //   .visit("/")
  //   .get('[name="email"]')
  //   .type("abcd.com")
  //   .get(".text-medium")
  //   .should("have.text", "Please enter valid email");
  // .get('[name="password"]');
  //   .type("abcde@@")
  //   .should("have.text", "Password must be more than 10 chars");
});
