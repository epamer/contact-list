import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact, Mode } from 'src/app/app.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Output() formValue: EventEmitter<Contact> = new EventEmitter();
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();
  @Input() contact: Contact;
  @Input() mode: string;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.initializeForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const contact = changes.contact.currentValue;
    this.setFormValue(contact);
  }

  initializeForm() {
    return this.fb.group({
      firstName: [null],
      lastName: [null],
      phone: [{ value: null, disabled: this.mode === Mode.EDIT }],
      email: [{ value: null, disabled: this.mode === Mode.EDIT }],
      address: [{ value: null, disabled: this.mode === Mode.EDIT }],
      note: [{ value: null, disabled: this.mode === Mode.EDIT }],
    });
  }

  setFormValue(contact: Contact): void {
    console.log(contact);
    this.form.patchValue(contact);
  }

  onSubmitHandler(e: any): void {
    const contact = Object.assign(this.contact, this.form.value);
    this.formValue.emit(contact);
  }

  onCancelHandler(): void {
    this.cancelEdit.emit();
  }
}
