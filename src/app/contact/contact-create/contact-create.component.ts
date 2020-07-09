import { Component, OnInit } from '@angular/core';
import { Mode, Contact } from 'src/app/app.model';
import { Router } from '@angular/router';
import { ModeService } from 'src/app/mode.service';
import { ContactsService } from 'src/app/contacts.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss'],
})
export class ContactCreateComponent implements OnInit {
  mode: string = Mode.CREATE;
  contact: Contact = Contact.getInitialState();
  constructor(
    private router: Router,
    private modeService: ModeService,
    private contactService: ContactsService
  ) {}

  ngOnInit(): void {}

  onCreateContact(formValue: Contact): void {
    this.contactService
      .createContact(formValue)
      .subscribe((contact: Contact): void => {
        this.router.navigate(['/contacts', contact.id]);
      });
  }

  cancelEdit() {
    this.router.navigate(['/contacts']);
  }

  propagateModeValue() {
    this.modeService.setMode(this.mode);
  }
}
