import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact, Mode } from 'src/app/app.model';
import { ActivatedRoute } from '@angular/router';
import { map, tap, takeWhile, mergeMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  id: string | null;
  contact: Contact = Contact.getInitialState();
  isAlive = true;
  mode: string = Mode.DETAILS;

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit(): void {
    this.getCurrentId()
      .pipe(
        takeWhile(() => this.isAlive),
        mergeMap((id: string | null) => {
          if (id === null) {
            return of(null);
          }
          this.id = id;
          return this.getContactById(+id);
        }),
        tap((contact) => {
          this.contact = contact;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  getContactById(id: number): Observable<Contact> {
    return this.appService.getCotactById(id);
  }

  getCurrentId(): Observable<string> {
    return this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  }
}
