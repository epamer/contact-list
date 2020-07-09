import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactsByGroup } from 'src/app/app.model';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
})
export class SidebarListComponent {
  @Input() contactsByGroup: ContactsByGroup;
  @Input() currentItemId: number;
  @Input() mode: string;

  @Output() deleteItem: EventEmitter<number> = new EventEmitter();

  onDeleteItem(id: number): void {
    this.deleteItem.emit(id);
  }
}
