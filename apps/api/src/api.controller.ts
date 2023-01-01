import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from './file.entity';
import { FilesService } from './files/files.service';

@Controller()
export class ApiController {
  constructor(
    private fileService: FilesService
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.fileService.uploadFile(file);
  }

}
