import { Module, DynamicModule, Global } from "@nestjs/common";
import { CONFIG_OPTIONS } from "src/common/common.constants";
import { MailService } from "./mail.service";
import { MailModuleOptions } from "./mail.interface";

@Module({
  providers: [MailService],
})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      exports: [MailService],
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, MailService],
    };
  }
}
