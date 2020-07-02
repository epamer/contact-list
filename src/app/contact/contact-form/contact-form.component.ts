import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/app.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact;
  @Input() mode: string;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setFormValue(this.contact);
  }

  initializeForm() {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      phone: [null],
      email: [null],
      address: [null],
      note: [null],
    });
  }

  setFormValue(contact: Contact): void {
    if (this.contact) {
      this.form.patchValue(this.contact);
    }
  }
}
