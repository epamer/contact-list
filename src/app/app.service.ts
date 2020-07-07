import { Injectable } from '@angular/core';
import { ContactsByGroup } from './app.model';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// import * as data from '../assets/data.json';
import { mapContacts } from '../utils/data.utils';
import { Contact } from 'src/app/app.model';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  // setContacts(value: ContactsByGroup) {
  //   this.contacts$.next(value);
  // }

  // getContactsByGroup(): BehaviorSubject<ContactsByGroup> {
  //   const contactsByGroup = mapContacts(data.contacts);

  //   this.setContacts(contactsByGroup);
  //   return this.contacts$;
  // }

  // getCotactById(id: number): Observable<Contact> {
  //   return this.contacts$.pipe(
  //     map(
  //       (obj: ContactsByGroup): Contact => {
  //         const entries = Object.entries(obj);
  //         for (const entry of entries) {
  //           const [key, value] = entry;
  //           const item = value.find((contact: Contact) => contact.id === id);
  //           if (item) {
  //             return item;
  //           }
  //         }
  //       }
  //     )
  //   );
  // }

  /**
   * @todo- implement add, edit, remove methods
   */
  fetchContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${baseUrl}/contacts`);
  }

  getContactById(id: number) {
    return this.http.get<Contact>(`${baseUrl}/contacts/${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${baseUrl}/contacts`, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    const { id } = contact;
    return this.http.put<Contact>(`${baseUrl}/contacts/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/contacts/${id}`);
  }
}
