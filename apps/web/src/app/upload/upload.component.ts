import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {
  private _file: File | null;
  filename: string;
  link: string | null;
  uploadProgress: number;

  constructor(
    private fileService: FileService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
    this._file = null;
    this.filename = "No file selected.";
    this.link = null;
    this.uploadProgress = 0;
  }

  uploadFile(): void {
    if (null !== this._file) {
      this.fileService.uploadFile(this._file).subscribe(
        (v) => {
          if (v.type === HttpEventType.UploadProgress && v.total) {
            this.uploadProgress = Math.round((100 * v.loaded) / v.total)
          } else if (v.type === HttpEventType.Response && v.body) {
            this.openSnackBar('File uploaded successfully')
            this.link = this.location.prepareExternalUrl("files/" + (v.body as Express.Multer.File).filename);
          }
        },
        (err) => {
          this.openSnackBar('Error uploading your file')
        }
      );
    }
  }

  onFileSelect(event: Event): void {
    const el = event.target as HTMLInputElement;

    if (null !== el.files) {
      this._file = el.files.item(0);
    }
    if (this._file) {
      this.filename = this._file.name;
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message)
  }

}
