import { Component, OnInit } from '@angular/core';
import { ContactsByGroup, Contact } from 'src/app/app.model';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/app.service';
import { RouterStateService } from 'src/app/router-state.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  contactsByGroup$: Observable<ContactsByGroup>;
  editItemId$: Observable<number>;
  contacts$: Observable<Contact[]>;

  constructor(
    private service: AppService,
    private routerStateService: RouterStateService
  ) {}

  /**
   * @todo - implement activeItemId
   */
  ngOnInit(): void {
    this.contacts$ = this.service.fetchContacts().pipe(startWith([]));

    // this.service
    //   .createContact({
    //     address: '56 Maple Trail',
    //     email: 'gtween0@cnn.com',
    //     firstName: 'Gar',
    //     id: 101,
    //     lastName: 'Tween',
    //     note: 'Automated multimedia moratorium',
    //     phone: '197-852-1329',
    //   })
    //   .subscribe((contact) => console.log(contact));

    // this.contactsByGroup$ = this.service.getContactsByGroup();
    this.editItemId$ = this.routerStateService
      .getRouterParam()
      .pipe(map((id) => +id));
  }
}
