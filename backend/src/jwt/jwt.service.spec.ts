import { JwtService } from "./jwt.service";
import { Test } from "@nestjs/testing";
import * as jwt from "jsonwebtoken";

import { CONFIG_OPTIONS } from "src/common/common.constants";

const TEST_KEY = "testKey";
const payload = { userId: 1 };

jest.mock("jsonwebtoken", () => {
  return {
    sign: jest.fn(() => "TOKEN"),
    verify: jest.fn(() => payload),
  };
});

describe("JwtService", () => {
  let service: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY },
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("sign", () => {
    it("should return a signed token", () => {
      const token = service.sign(payload);

      expect(typeof token).toBe("string");
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith(payload, TEST_KEY);
    });
  });
  describe("verify", () => {
    it("should return the decoded token", () => {
      const TOKEN = "TOKEN";
      const decodedToken = service.verify(TOKEN);

      expect(decodedToken).toEqual(payload);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(TOKEN, TEST_KEY);
    });
  });
});
