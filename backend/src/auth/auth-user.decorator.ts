import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const graphqlContext = GqlExecutionContext.create(context).getContext();
    const user = graphqlContext["user"];
    return user;
  },
);
