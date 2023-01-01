import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', component: UploadComponent},
  { path: 'files/:id', component: FileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
