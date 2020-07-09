import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContactsByGroup, Contact, Mode } from 'src/app/app.model';
import { RouterStateService } from 'src/app/router-state.service';
import { ContactsService } from '../contacts.service';
import { ModeService } from '../mode.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  contactsByGroup$: Observable<ContactsByGroup>;
  currentItemId$: Observable<number>;
  contacts$: Observable<Contact[]>;
  mode$: Observable<string>;

  constructor(
    private contactsService: ContactsService,
    private routerStateService: RouterStateService,
    private router: Router,
    private modeService: ModeService
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.contactsService.getContacts();
    this.currentItemId$ = this.routerStateService
      .getRouterParam()
      .pipe(map((id) => +id));
    this.mode$ = this.modeService.getMode();
  }

  onDeleteItem(id: number): void {
    this.contactsService.deleteContact(id);
    this.router.navigate(['contacts']);
  }
}
