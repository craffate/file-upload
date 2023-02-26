import { Controller, Get, HttpStatus, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import { File } from '../file.entity';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

    constructor(
        private fileService: FilesService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    async uploadFile(
      @UploadedFile() file: Express.Multer.File,
      @Res({passthrough: true}) res: Response<File>
      ): Promise<File> {
      const ret = await this.fileService.uploadFile(file);
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR

      if (ret) {
        statusCode = HttpStatus.CREATED
      }
      res.statusCode = statusCode
      return ret
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

    @Get(":filename/info")
    getFileInfoByName(
      @Param('filename') filename: string
    ): Promise<File> {
      return this.fileService.getFileByName(filename);
    }
}
