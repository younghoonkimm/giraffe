import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

//guard
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context).getContext();
    const user = graphqlContext["user"];
    if (!user) {
      return false;
    }
    return true;
  }
}
