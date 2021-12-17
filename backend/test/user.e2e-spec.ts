import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { getConnection, Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

jest.mock("got", () => {
  return {
    post: jest.fn(),
  };
});

const GRAPHQL_ENDPOINT = "/graphql";

const testUser = {
  email: "kxkm05@nate.com",
  password: "123,5",
};

describe("UserModule (e2e)", () => {
  let app;
  let userRepository: Repository<User>;
  let jwtToken: string;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest().set("X-JWT", jwtToken).send({ query });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe("createAccount", () => {
    it("should create account", () => {
      return publicTest(`
          mutation {
            createAccount(input: {
              email:"${testUser.email}",
              password:"${testUser.password}",
              role:Owner
            }) {
              ok
              error
            }
          }
          `)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });
    it("should fail if account already exists", () => {
      return publicTest(`
            mutation {
              createAccount(input: {
                email:"${testUser.email}",
                password:"${testUser.password}",
                role:Owner
              }) {
                ok
                error
              }
            }
          `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                createAccount: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(false);
          expect(error).toBe("등록된 사용자가 있습니다");
        });
    });
  });

  describe("login", () => {
    it("should login with correct credentials", () => {
      return publicTest(`
          mutation {
            login(input:{
              email:"${testUser.email}",
              password:"${testUser.password}",
            }) {
              ok
              error
              token
            }
          }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        });
    });
    it("should not be able to login with wrong credentials", () => {
      return publicTest(`
        mutation {
          login(input:{
            email:"${testUser.email}",
            password:"22222",
          }) {
            ok
            error
            token
          }
        }
      `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe("Wrong password");
          expect(login.token).toBe(null);
        });
    });
  });

  describe("userProfile", () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await userRepository.find();
      userId = user.id;
    });
    it("should find a user's profile", () => {
      return privateTest(`{
        userProfile(userId:${userId}){
          ok
          error
          user {
            id
            }
           }
         }
       `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                userProfile: {
                  ok,
                  error,
                  user: { id },
                },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(id).toBe(userId);
        });
    });

    it("should not find a user's profile", () => {
      return privateTest(`{
            userProfile(userId:23131){
              ok
              error
              user {
                id
                }
              }
            }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                userProfile: { ok, error, user },
              },
            },
          } = res;
          expect(ok).toBe(false);
          expect(error).toBe("User not found");
          expect(user).toBe(null);
        });
    });
  });

  describe("me", () => {
    it("should find my profile", () => {
      return privateTest(`
      {
        me {
          email
        }
      }
     `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                me: { email },
              },
            },
          } = res;
          expect(email).toBe(testUser.email);
        });
    });

    it("should not allow logged out user", () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set("X-JWT", null)
        .send({
          query: `
            {
              me {
                email
              }
            }
         `,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: { errors },
          } = res;

          expect(errors[0].message).toBe("jwt malformed");
        });
    });
  });

  it.todo("verifyEmail");
  it.todo("editProfile");
});
