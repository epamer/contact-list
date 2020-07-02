import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/app.model';
import { ModeConfig } from 'src/app/app.model';

@Component({
  selector: 'app-contact-navbar',
  templateUrl: './contact-navbar.component.html',
  styleUrls: ['./contact-navbar.component.scss'],
})
export class ContactNavbarComponent implements OnInit {
  @Input() id: string | null = null;
  @Input() mode: string;
  @Output() editContact: EventEmitter<Contact> = new EventEmitter();
  isDisplay: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isDisplay = ModeConfig.init().displayBtnEdit[this.mode];
  }

  onEditHandler(): void {
    /**
     * @todo - remove test code
     */
    const test: Contact = {
      id: null,
      firstName: 'Reinold',
      lastName: 'Quakley',
      email: 'rquakley1@nhs.uk',
      phone: '219-737-5590',
      address: '189 Dunning Terrace',
      note: 'Diverse multi-state success',
    };

    this.editContact.emit(test);
  }
}
