import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User, UserRole } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { async } from "rxjs";

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(() => "token"),
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
  let jwtService: JwtService;

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
    jwtService = module.get<JwtService>(JwtService);
    usersRepository = module.get(getRepositoryToken(User));
    verificationsRepository = module.get(getRepositoryToken(Verification));
  });

  describe("createAccount", () => {
    const createArgs = {
      email: "giraffe@email.com",
      password: "dsdsddssd.dssdsds",
      role: UserRole.Client,
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
  describe("login", () => {
    const loginArgs = {
      email: "giraffe@email.com",
      password: "dsdsddssd.dssdsds",
    };
    it("should fail if user not exist", async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const result = await service.login(loginArgs);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );
      expect(result).toEqual({
        ok: false,
        error: "User not found",
      });
    });

    it("should fail if the password is wrong", async () => {
      const mockedUser = {
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      usersRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.login(loginArgs);
      expect(result).toEqual({ ok: false, error: "Wrong password" });
    });

    it("shoud return token if password correct", async () => {
      const mockedUser = {
        id: 1,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      usersRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.login(loginArgs);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual({ ok: true, token: "token" });
    });
  });

  describe("findById", () => {
    const findByIdArgs = {
      id: 1,
    };
    it("should find an existing user", async () => {
      usersRepository.findOneOrFail.mockResolvedValue(findByIdArgs);
      const result = await service.findById(1);
      console.log(result);
      expect(result).toEqual({ ok: true, user: findByIdArgs });
    });

    it("should fail if no user is found", async () => {
      usersRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.findById(1);
      console.log(result);
      expect(result).toEqual({ ok: false, error: "User Not Found" });
    });
  });

  describe("editProfile", () => {
    it("should change email", async () => {
      const oldUser = {
        email: "bs@old.com",
        verified: true,
      };
      const editProfileArgs = {
        userId: 1,
        input: { email: "bs@new.com" },
      };

      const newVerification = {
        code: "code",
      };

      const newUser = { verified: false, email: editProfileArgs.input.email };

      usersRepository.findOne.mockResolvedValue(oldUser);
      verificationsRepository.create.mockReturnValue(newVerification);
      verificationsRepository.save.mockResolvedValue(newVerification);

      await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(
        editProfileArgs.userId,
      );
      expect(verificationsRepository.create).toHaveBeenCalledWith({
        user: newUser,
      });
      expect(verificationsRepository.save).toHaveBeenCalledWith(
        newVerification,
      );

      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        newUser.email,
        newVerification.code,
      );
    });

    it("should change password", async () => {
      const editProfileArgs = {
        userId: 1,
        input: { password: "new.password" },
      };
      usersRepository.findOne.mockResolvedValue({ password: "old" });
      const result = await service.editProfile(
        editProfileArgs.userId,
        editProfileArgs.input,
      );
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
      expect(result).toEqual({ ok: true });
    });

    it("should fail on exception", async () => {
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.editProfile(1, { email: "12" });
      expect(result).toEqual({ ok: false, error: "Could not update profile." });
    });
  });

  it.todo("verifyEmail");
});
