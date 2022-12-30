import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from '../file.entity';

@Injectable()
export class FileService {
    private readonly _fileRepository: Repository<File>;

    constructor(
        private dataSource: DataSource
    ) {
        this._fileRepository = this.dataSource.getRepository(File);
    }

    uploadFile(file: Express.Multer.File): Promise<File> {
        return this._fileRepository.save(file);
    }

    getFileByName(name: string): Promise<File | null> {
        return this._fileRepository.findOneBy({ filename: name });
    }
}
