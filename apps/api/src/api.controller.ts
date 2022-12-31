import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from './file.entity';
import { FileService } from './file/file.service';

@Controller()
export class ApiController {
  constructor(
    private fileService: FileService
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.fileService.uploadFile(file);
  }

}
