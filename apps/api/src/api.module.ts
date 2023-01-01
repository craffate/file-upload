import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { File } from './file.entity';
import { FilesService } from './files/files.service';
import { FilesController } from './files/files.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'file_upload',
      entities: [File],
      synchronize: true,
    })
  ],
  controllers: [ApiController, FilesController],
  providers: [FilesService, FilesService],
})
export class ApiModule {
  constructor() {}
}
