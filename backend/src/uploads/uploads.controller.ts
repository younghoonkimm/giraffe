import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from "aws-sdk";

// AWS.config.update({
//     credentials:{

//     }
// })

@Controller("uploads")
export class UploadsController {
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file) {}
}
// AKIAVW4QO22OMFVSWX7L
// fuVTdkGKTXsLaSGw6OpZkJFmcajND9g7BfSgF2KL
