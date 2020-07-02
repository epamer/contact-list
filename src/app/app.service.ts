import { Injectable } from '@angular/core';
import { ContactsByGroup } from './app.model';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as data from '../assets/data.json';
import { mapContacts } from '../utils/data.utils';
import { Contact } from 'src/app/app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private contacts$: BehaviorSubject<ContactsByGroup> = new BehaviorSubject({});

  setContacts(value: ContactsByGroup) {
    this.contacts$.next(value);
  }

  getContactsByGroup(): BehaviorSubject<ContactsByGroup> {
    const contactsByGroup = mapContacts(data.contacts);

    this.setContacts(contactsByGroup);
    return this.contacts$;
  }

  getCotactById(id: number): Observable<Contact> {
    return this.contacts$.pipe(
      map(
        (obj: ContactsByGroup): Contact => {
          const entries = Object.entries(obj);
          for (const entry of entries) {
            const [key, value] = entry;
            const item = value.find((contact: Contact) => contact.id === id);
            if (item) {
              return item;
            }
          }
        }
      )
    );
  }
}
