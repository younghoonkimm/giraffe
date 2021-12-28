import { Module } from "@nestjs/common";
import { UploadsController } from "./uploads.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [UploadsController],
  imports: [ConfigModule],
})
export class UploadsModule {}
