import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {
  private readonly _formData: FormData;
  private _file: File | null;
  link: string | null;

  constructor(
    private fileService: FileService,
    private location: Location
  ) {
    this._formData = new FormData();
    this._file = null;
    this.link = null;
  }

  uploadFile(): void {
    if (null !== this._file) {
      this.fileService.uploadFile(this._file).subscribe(v => {
        this.link = this.location.prepareExternalUrl("files/" + v.filename);
      });
    }
  }

  onFileSelect(event: Event): void {
    const el = event.target as HTMLInputElement;

    if (null !== el.files) {
      this._file = el.files.item(0);
    }
  }

}
