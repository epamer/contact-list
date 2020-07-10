import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Contact } from 'src/app/app.model';
import { HttpService } from '../shared/services/http.service';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject([]);

  constructor(private httpService: HttpService) {}

  init(): Observable<Contact[]> {
    return this.httpService.fetchContacts().pipe(
      tap((contacts) => {
        this.contacts$.next(contacts);
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.contacts$.asObservable();
  }

  createContact(data: Contact): Observable<Contact> {
    const contacts = this.contacts$.getValue();
    const { id: lastItemId }: { id: number } = contacts.slice(-1).pop();
    const newContact: Contact = Object.assign(data, {
      id: lastItemId + 1,
    });

    return this.httpService.createContact(newContact).pipe(
      tap((contact): void => {
        this.contacts$.next([...contacts, contact]);
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  deleteContact(id: number): Observable<number> {
    return this.httpService.deleteContact(id).pipe(
      map(() => {
        const contacts = this.contacts$
          .getValue()
          .filter((contact) => contact.id !== id);
        this.contacts$.next(contacts);
        return id;
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  updateContact(newContact: Contact): Observable<Contact> {
    const { id } = newContact;
    return this.httpService.updateContact(newContact).pipe(
      tap((contact: Contact): void => {
        const contacts = this.contacts$.getValue().map((el) => {
          if (el.id === id) {
            return contact;
          }
          return el;
        });
        this.contacts$.next(contacts);
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }
}
