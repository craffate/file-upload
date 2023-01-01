import { Controller, Get, Param, Res, StreamableFile, } from '@nestjs/common';
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
