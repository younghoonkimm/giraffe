import { Injectable, Inject } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

import { JWTModuleOptions } from "./jwt.interfaces";
import { CONFIG_OPTIONS } from "./jwt.constants";

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JWTModuleOptions,
  ) {
    console.log(options);
  }
  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
