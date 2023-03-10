import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.sass']
})
export class FileComponent {
  private readonly _filename: string | null;
  public fileInfo: Express.Multer.File | undefined;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService
  ) {
    this._filename = this.route.snapshot.paramMap.get('id');
    this.getFileInfo();
  }

  downloadFile() {
    if (this._filename) {
      this.fileService.getFileByName(this._filename).subscribe(v => {
        this.startDownload(v);
      });
    }
  }

  private getFileInfo() {
    if (this._filename) {
      this.fileService.getFileInfoByName(this._filename).subscribe(v => {
        this.fileInfo = v;
      });
    }
  }

  private startDownload(blob: Blob) {
    const anchor = document.createElement('a');

    anchor.setAttribute('style', 'display: none;');
    document.body.appendChild(anchor);
    anchor.href = URL.createObjectURL(blob);
    anchor.download = this._filename || 'file';
    anchor.target = '_blank';
    anchor.click();
    URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }
}
