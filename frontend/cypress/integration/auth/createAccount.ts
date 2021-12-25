describe("Create Account", () => {
  const user = cy;
  it("should see validate error", () => {
    user.visit("/");
    user.findByText(/create account/i).click();
    user.visit("/create-account").title().should("eq", "Create Account | Giraffe");
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
  it("should see create-account page", () => {
    user.intercept("http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "createAccountMutation") {
        req.reply((res) => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: null,
                __typename: "CreateAccountOutput",
              },
            },
          });
        });
      }
    });
    user.visit("/create-account");
    user.findByPlaceholderText(/email/i).type("kxkm09@nater.com");
    user.findByPlaceholderText(/password/i).type("adfsds!318");
    user.findByRole("button").click();
    user.wait(1000);
    user.visit("/").title().should("eq", "Login | Giraffe");
    user.login("kxkm09@nater.com", "adfsds!318");
  });
});
