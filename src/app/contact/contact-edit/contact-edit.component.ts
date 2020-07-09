import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode, Contact } from 'src/app/app.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterStateService } from 'src/app/router-state.service';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';
import { ContactsService } from 'src/app/contacts.service';
import { ModeService } from 'src/app/mode.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  mode: string = Mode.EDIT;
  contact$: Observable<Contact>;
  id: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private routerStateService: RouterStateService,
    private service: AppService,
    private contactsService: ContactsService,
    private modeService: ModeService
  ) {}

  ngOnInit(): void {
    this.id = this.getItemId();
    this.propagateParamValue(this.id);
    this.contact$ = this.getContactById(this.id);
    this.modeService.setMode(Mode.EDIT);
  }

  ngOnDestroy(): void {
    this.propagateParamValue(null);
  }

  getItemId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  /**
   * this method propagates a param's value to the sidebar.
   */
  propagateParamValue(id: string): void {
    this.routerStateService.setRouterParam(id);
  }

  getContactById(id: string): Observable<Contact> {
    return this.service.getContactById(+id);
  }

  onEditContact(contact: Contact): void {
    this.contactsService.updateContact(contact);
    this.router.navigate(['/contacts', this.id]);
  }

  onCancelEdit(): void {
    this.router.navigate(['/contacts', this.id]);
  }
}
