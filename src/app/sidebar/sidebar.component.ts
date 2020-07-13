import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { ContactsByGroup, Contact, DialogData } from 'src/app/app.model';
import { RouterStateService } from 'src/app/shared/services/router-state.service';
import { ContactsService } from '../contact/contacts.service';
import { ModeService } from '../shared/services/mode.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  contactsByGroup$: Observable<ContactsByGroup>;
  currentItemId$: Observable<number>;
  contacts$: Observable<Contact[]>;
  mode$: Observable<string>;
  isAlive = true;

  constructor(
    private contactsService: ContactsService,
    private routerStateService: RouterStateService,
    private router: Router,
    private modeService: ModeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.contactsService.getContacts();
    this.currentItemId$ = this.routerStateService
      .getRouterParam()
      .pipe(map((id) => +id));
    this.mode$ = this.modeService.getMode();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  onDeleteItem(id: number): void {
    this.openDialog(id)
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((confirm: boolean): void => {
        if (confirm) {
          this.contactsService.deleteContact(id).subscribe();
          this.router.navigate(['contacts']);
        }
      });
  }

  openDialog(id: number) {
    const data: DialogData = {
      title: 'Delete item',
      text: `Would you like to delete item ${id}?`,
      noBtnTitle: 'Cancel',
      yesBtnTitle: 'Delete',
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      data,
    });

    return dialogRef;
  }
}
