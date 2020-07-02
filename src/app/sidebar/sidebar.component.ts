import { Component, OnInit } from '@angular/core';
import { ContactsByGroup } from 'src/app/app.model';

import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { RouterStateService } from 'src/app/router-state.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  contactsByGroup$: Observable<ContactsByGroup>;
  editItemId$: Observable<number>;

  constructor(
    private service: AppService,
    private routerStateService: RouterStateService
  ) {}

  /**
   * @todo - implement activeItemId
   */
  ngOnInit(): void {
    this.contactsByGroup$ = this.service.getContactsByGroup();
    this.editItemId$ = this.routerStateService
      .getRouterParam()
      .pipe(map((id) => +id));
  }
}
