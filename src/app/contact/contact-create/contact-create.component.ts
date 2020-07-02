import { Component, OnInit } from '@angular/core';
import { Mode, Contact } from 'src/app/app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss'],
})
export class ContactCreateComponent implements OnInit {
  mode: string = Mode.CREATE;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEditContact(contact: Contact): void {
    console.log('from details ', contact);
    this.router.navigate(['/contacts']);
  }
}
