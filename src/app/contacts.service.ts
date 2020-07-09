import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Contact } from 'src/app/app.model';
import { AppService } from './app.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts$: BehaviorSubject<Contact[]> = new BehaviorSubject([]);

  constructor(private httpService: AppService) {}

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

  deleteContact(id: number): void {
    this.httpService.deleteContact(id).subscribe((value) => {
      console.log(value);
      const contacts = this.contacts$
        .getValue()
        .filter((contact) => contact.id !== id);
      this.contacts$.next(contacts);
    });
  }

  updateContact(newContact: Contact): void {
    const { id } = newContact;
    this.httpService.updateContact(newContact).subscribe(() => {
      const contacts = this.contacts$.getValue().map((el) => {
        if (el.id === id) {
          return newContact;
        }
        return el;
      });
      this.contacts$.next(contacts);
    });
  }
}
