describe("Edit Profile", () => {
  const user = cy;
  beforeEach(() => {
    user.login("kxkm09@nate.com", "adfsds!318");
    user.assertLoggedIn();
  });
  it("can go to /edit-profile using the header", () => {
    user.get('a[href="/edit-profile"]').click();
    user.wait(2000);
    user.title().should("eq", "Edit Profile | Giraffe");
  });

  it("can change email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "editProfile") {
        // @ts-ignore
        req.body?.variables?.input?.email = "kxkm09@nate.com";
      }
    });
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("button").click();
  });
});
