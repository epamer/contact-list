import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DilogComponent } from './dilog/dilog.component';

@NgModule({
  declarations: [DilogComponent],
  imports: [CommonModule],
  exports: [DilogComponent],
})
export class SharedModule {}
