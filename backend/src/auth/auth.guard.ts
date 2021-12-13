import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { AllowRoles } from "./role.decorator";
import { User } from "src/users/entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { UsersService } from "src/users/users.service";
//guard
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowRoles>("roles", context.getHandler());

    if (!roles) {
      return true;
    }
    const graphqlContext = GqlExecutionContext.create(context).getContext();
    const token = graphqlContext.token;
    const decoded = this.jwtService.verify(token.toString());
    if (token) {
      if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
        const id = decoded["id"];
        const { user } = await this.userService.findById(id);

        if (!user) {
          return false;
        }
        graphqlContext["user"] = user;
        if (roles.includes("Any")) {
          return true;
        }
        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
