import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly _api: string;

  constructor(
    private http: HttpClient
  ) {
    this._api = "/api";
  }

  uploadFile(file: File): Observable<HttpEvent<unknown>> {
    const formData = new FormData();

    formData.append("file", file, file.name);
    return this.http.post<Express.Multer.File>(this._api + "/files", formData, { observe: 'events', reportProgress: true, responseType: 'json' });
  }

  getFileByName(name: string): Observable<Blob> {
    return this.http.get(this._api + `/files/${name}`, { responseType: 'blob' });
  }

  getFileInfoByName(name: string): Observable<Express.Multer.File> {
    return this.http.get<Express.Multer.File>(this._api + `/files/${name}/info`);
  }
}
