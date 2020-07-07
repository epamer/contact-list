import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mode, Contact } from 'src/app/app.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterStateService } from 'src/app/router-state.service';
import { AppService } from 'src/app/app.service';
import { Observable } from 'rxjs';

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
    private service: AppService
  ) {}

  ngOnInit(): void {
    this.id = this.getItemId();
    this.propagateParamValue(this.id);
    // this.contact$ = this.getContactById(this.id);
  }

  ngOnDestroy(): void {
    this.propagateParamValue(null);
  }

  onEditContact(contact: Contact): void {
    console.log('from details ', contact);
    this.router.navigate(['/contacts']);
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

  // getContactById(id: string): Observable<Contact> {
  //   return this.service.getCotactById(+id);
  // }
}
