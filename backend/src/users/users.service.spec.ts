import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { async } from "rxjs";

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe("UserService", () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;
  let verificationsRepository: MockRepository<Verification>;
  let mailService: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    mailService = module.get<MailService>(MailService);
    usersRepository = module.get(getRepositoryToken(User));
    verificationsRepository = module.get(getRepositoryToken(Verification));
  });

  describe("createAccount", () => {
    const createArgs = {
      email: "giraffe@email.com",
      password: "dsdsddssd.dssdsds",
      role: 0,
    };
    it("if user exists should be fail", async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: "chooset_@naverc.com",
      });
      const result = await service.createAccount(createArgs);
      expect(result).toMatchObject({
        ok: false,
        error: "등록된 사용자가 있습니다",
      });
    });

    it("should create a new user", async () => {
      usersRepository.findOne.mockResolvedValue(undefined);
      usersRepository.create.mockReturnValue(createArgs);
      usersRepository.save.mockResolvedValue(createArgs);

      verificationsRepository.create.mockReturnValue({
        user: createArgs,
      });
      verificationsRepository.save.mockResolvedValue({
        code: "code",
      });
      const result = await service.createAccount(createArgs);

      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith(createArgs);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(createArgs);
      expect(verificationsRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationsRepository.create).toHaveBeenCalledWith({
        user: createArgs,
      });

      expect(verificationsRepository.save).toHaveBeenCalledTimes(1);
      expect(verificationsRepository.save).toHaveBeenCalledWith({
        user: createArgs,
      });
      expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
      );

      expect(result).toEqual({ ok: true });
    });

    it("should fail on exception", async () => {
      usersRepository.findOne.mockRejectedValue(new Error());

      const result = await service.createAccount(createArgs);

      console.log(result);
      expect(result).toEqual({ ok: false, error: "계정생성에 실패하였습니다" });
    });
  });
  //   it.todo("createAccount");
  describe("login", () => {});
  it.todo("findById");
  it.todo("editProfile");
  it.todo("verifyEmail");
});
