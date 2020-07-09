import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.sub = this.contactsService.init().subscribe();

    // this fixs the issue when mat-sidebar overlaps mat-sidenav-content
    // by default the width of draver container is only mesured in a few key cases:
    // 1) on open, 2) on mode change, 3) on window resize
    window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
