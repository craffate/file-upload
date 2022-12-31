import { Controller, Get, Param, Res, StreamableFile, } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import { File } from '../file.entity';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

    constructor(
        private fileService: FileService
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
}
