import { Pipe, PipeTransform } from '@angular/core';

import { Contact, ContactsByGroup } from '../app.model';
import { mapContacts } from '../../utils/data.utils';

@Pipe({
  name: 'contactsByGroup',
})
export class ContactsByGroupPipe implements PipeTransform {
  transform(contacts: Contact[]): ContactsByGroup {
    return mapContacts(contacts);
  }
}
