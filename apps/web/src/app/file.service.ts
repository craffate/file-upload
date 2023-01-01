import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly _api: string;

  constructor(
    private http: HttpClient
  ) {
    this._api = "http://localhost:3000";
  }

  uploadFile(file: File): Observable<Express.Multer.File> {
    const formData = new FormData();

    formData.append("file", file, file.name);
    return this.http.post<Express.Multer.File>(this._api + "/files", formData);
  }

  getFileByName(name: string): Observable<Blob> {
    return this.http.get(this._api + `/files/${name}`, { responseType: 'blob' });
  }

  getFileInfoByName(name: string): Observable<Express.Multer.File> {
    return this.http.get<Express.Multer.File>(this._api + `/files/${name}/info`);
  }
}
