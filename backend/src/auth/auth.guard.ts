import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { AllowRoles } from "./role.decorator";
import { User } from "src/users/entities/user.entity";
//guard
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowRoles>("roles", context.getHandler());

    if (!roles) {
      return true;
    }
    const graphqlContext = GqlExecutionContext.create(context).getContext();
    console.log(graphqlContext.token);
    const user: User = graphqlContext["user"];
    if (!user) {
      return false;
    }
    if (roles.includes("Any")) {
      return true;
    }
    return roles.includes(user.role);
  }
}
