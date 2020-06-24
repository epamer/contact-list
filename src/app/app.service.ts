import { Injectable } from '@angular/core';
import { ContactsByGroup } from './app.model';

import { BehaviorSubject } from 'rxjs';

import * as data from '../assets/data.json';
import { mapContacts } from '../utils/data.utils';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  private contacts$: BehaviorSubject<ContactsByGroup> = new BehaviorSubject({});

  setContacts(value: ContactsByGroup) {
    this.contacts$.next(value);
  }

  getContactsByGroup(): BehaviorSubject<ContactsByGroup> {
    const contactsByGroup = mapContacts(data.contacts);
    this.setContacts(contactsByGroup);
    return this.contacts$;
  }
}
