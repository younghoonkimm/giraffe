import { Injectable, Inject } from "@nestjs/common";
import got from "got";
import * as FormData from "form-data";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { MailModuleOptions } from "./mail.interface";
import { text } from "express";
import { EmailVars } from "src/jwt/jwt.interfaces";

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVars[],
    to?: string,
  ) {
    const form = new FormData();
    form.append("from", `Kim from Giraffe <mailgun@${this.options.domain}>`);
    form.append("to", "kyh0404@olivestonelab.com");
    form.append("subject", subject);
    form.append("template", template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apikey}`,
          ).toString("base64")}`,
        },
        method: "POST",
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail("Verify Your Email", "sdds", [
      { key: "code", value: code },
      { key: "username", value: email },
    ]);
  }
}
