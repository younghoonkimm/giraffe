import { MutationOutput } from "src/common/dto/output.dto";
import { ObjectType, PickType, InputType } from "@nestjs/graphql";
import { Verification } from "../entities/verification.entity";

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {}

@InputType()
export class VerifyEmailInput extends PickType(Verification, ["code"]) {}
