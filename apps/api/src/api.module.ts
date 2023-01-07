import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { File } from './file.entity';
import { FilesService } from './files/files.service';
import { FilesController } from './files/files.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'file_upload.db',
      entities: [File],
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
    })
  ],
  controllers: [ApiController, FilesController],
  providers: [FilesService, FilesService],
})
export class ApiModule {
  constructor() {}
}
