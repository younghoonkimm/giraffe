import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { getConnection, Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Verification } from "src/users/entities/verification.entity";

jest.mock("got", () => {
  return {
    post: jest.fn(),
  };
});

const GRAPHQL_ENDPOINT = "/graphql";

const testUser = {
  email: "nico@las.com",
  password: "12345",
};

describe("UserModule (e2e)", async () => {
  let app: INestApplication;

  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();
  await app.init();
});
