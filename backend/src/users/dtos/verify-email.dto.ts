import { CoreOutput } from "src/common/dto/output.dto";
import { ObjectType, PickType, InputType } from "@nestjs/graphql";
import { Verification } from "../entities/verification.entity";

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}

@InputType()
export class VerifyEmailInput extends PickType(Verification, ["code"]) {}
