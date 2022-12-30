import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'web';
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
        this.link = this.location.prepareExternalUrl("file/" + v.filename);
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
