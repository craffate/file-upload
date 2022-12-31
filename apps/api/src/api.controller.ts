import { Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
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

  @Get(":filename")
  async getFileByName(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') filename: string
    ): Promise<StreamableFile> {
    const file: File = await this.fileService.getFileByName(filename);
    const fileStream: ReadStream = createReadStream(join(process.cwd(), file.path));

    res.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `attachment; filename="${file.filename}"`
    })
    return new StreamableFile(fileStream);
  }
}
