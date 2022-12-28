import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiController } from './api.controller';
import { File } from './file.entity';

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
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {
  constructor(private dataSource: DataSource) {}
}
