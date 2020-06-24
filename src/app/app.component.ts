import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { ContactsByGroup } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  contactsByGroup$: Observable<ContactsByGroup>;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.contactsByGroup$ = this.service.getContactsByGroup();
  }
}
