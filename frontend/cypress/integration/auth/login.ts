describe("Log In", () => {
  const user = cy;
  it("should see login page", () => {
    user.visit("/").title().should("eq", "Login | Giraffe");
  });
  it("can see email / password validation errors", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("bad@email");
    user.findByRole("alert").should("have.text", "Please enter valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "email is required");
    user.findByPlaceholderText(/email/i).type("bad@email.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "password is required");
  });
  it("can fill out the form", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("kxkm09@naver.com");
    user.findByPlaceholderText(/password/i).type("aosldk!318");
    user.findByRole("button").should("not.have.class", "pointer-events-none").click();
    user.window().its("localStorage.token").should("be.a", "string");
  });
});
