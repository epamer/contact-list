import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from 'src/app/app.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

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
    return this.http.put<Contact>(`${baseUrl}/contacts/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/contacts/${id}`);
  }
}
