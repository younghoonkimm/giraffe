import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from "aws-sdk";




@Controller("uploads")
export class UploadsController {
  constructor(private readonly config: ConfigService) {}
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.config.get<string>("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.config.get<string>("AWS_SECRET_ACESS_KEY"),
      },
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: "public-read",
        })
        .promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (e) {
      return null;
    }
  }
}
