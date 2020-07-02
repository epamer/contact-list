import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ContactsByGroup } from 'src/app/app.model';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
})
export class SidebarListComponent implements OnInit, OnChanges {
  @Input() contactsByGroup: ContactsByGroup;
  @Input() editItemId: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {}
}
