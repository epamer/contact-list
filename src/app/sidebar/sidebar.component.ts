import { Component, Input, OnChanges } from '@angular/core';
import { ContactsByGroup } from 'src/app/app.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() contactsByGroup: ContactsByGroup;

  /**
   * @todo - implement activeId state
   */
  activeId = 27;
}
