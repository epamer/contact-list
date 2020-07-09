import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Contact } from 'src/app/app.model';
import { Mode } from '../../app.model';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnInit, OnChanges {
  @Input() contact: Contact;
  @Input() currentItemId: number;
  @Input() mode: string;

  isVisible: boolean;

  @Output() deleteItem: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.isVisible =
      this.currentItemId === this.contact.id && this.mode === Mode.EDIT;
  }

  onDeleteItem(): void {
    this.deleteItem.emit(this.contact.id);
  }
}
