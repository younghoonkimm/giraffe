import { Injectable, Inject } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

import { JWTModuleOptions } from "./jwt.interfaces";
import { CONFIG_OPTIONS } from "src/common/common.constants";

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JWTModuleOptions,
  ) {}
  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
