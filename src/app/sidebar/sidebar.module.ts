import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { SidebarComponent } from './sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { RouterModule } from '@angular/router';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { ContactsByGroupPipe } from './contacts-by-group.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarListComponent,
    ContactsByGroupPipe,
  ],
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
