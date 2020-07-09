import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/app.model';
import { ActivatedRoute, Params } from '@angular/router';
import {
  map,
  startWith,
  switchMap,
  delay,
  tap,
  takeWhile,
} from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Observable, of } from 'rxjs';
import { ModeService } from 'src/app/mode.service';
import { Mode } from '../../app.model';
import { RouterStateService } from 'src/app/router-state.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  id$: Observable<string | null>;
  contact$: Observable<Contact | null>;
  isAlive = true;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private modeService: ModeService,
    private routerStateService: RouterStateService
  ) {}

  ngOnInit(): void {
    this.id$ = this.getCurrentId();
    this.contact$ = this.initContact(this.id$);

    this.propagateParamValue(this.id$);
    this.propagateModeValue(Mode.DETAILS);
  }

  ngOnDestroy(): void {
    this.propagateParamValue(of(null));
    this.isAlive = false;
  }

  initContact(id$: Observable<string | null>): Observable<Contact | null> {
    return id$.pipe(
      switchMap(
        (id: string | null): Observable<Contact | null> => {
          if (id !== null) {
            return this.getContactById(+id);
          }
          return of(null);
        }
      )
    );
  }

  getCurrentId(): Observable<string | null> {
    return this.route.paramMap.pipe(
      map((paramMap: Params): string => paramMap.get('id'))
    );
  }

  getContactById(id: number): Observable<Contact> {
    const initialState = Contact.getInitialState();
    return this.appService.getContactById(id).pipe(startWith(initialState));
  }

  propagateParamValue(id$: Observable<string | null>): void {
    id$
      .pipe(
        tap((id: string): void => {
          this.routerStateService.setRouterParam(id);
        }),
        takeWhile(() => this.isAlive)
      )
      .subscribe();
  }

  propagateModeValue(mode: string): void {
    this.modeService.setMode(mode);
  }
}
