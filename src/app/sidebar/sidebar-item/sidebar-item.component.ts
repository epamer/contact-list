import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/app.model';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() editItemId: number;
  @Output() removeItem: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}

  onRemoveItem(): void {
    this.removeItem.emit(this.contact.id);
  }
}
