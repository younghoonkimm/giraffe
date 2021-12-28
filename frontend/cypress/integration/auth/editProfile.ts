describe("Edit Profile", () => {
  const user = cy;
  beforeEach(() => {
    // @ts-ignore
    user.login("kxkm09@nater.com", "adfsds!318");
    user.assertLoggedIn();
  });
  it("can go to /edit-profile using the header", () => {
    user.get('a[href="/edit-profile"]').click();
    user.wait(2000);
    user.title().should("eq", "Edit Profile | Giraffe");
  });
  it("can change email", () => {
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("kxkm09@nates.com");
    user.findByRole("button").click();
  });
});
