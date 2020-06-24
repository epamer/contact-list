import { Contact, ContactsByGroup } from '../app/app.model';

function insertElement(contacts: Contact[], el: Contact): Contact[] {
  if (!contacts.length) {
    return contacts.concat(el);
  }

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].lastName > el.lastName) {
      contacts.splice(i, 0, el);
      return contacts;
    }
  }

  return contacts.concat(el);
}

export function mapContacts(arr: Contact[]): ContactsByGroup {
  return arr.reduce((acc: ContactsByGroup, curr: Contact): ContactsByGroup => {
    const key: string = curr.lastName.trim().charAt(0).toLowerCase();
    const contacts: Contact[] = acc[key] || [];

    acc[key] = insertElement(contacts, curr);
    return acc;
  }, {});
}
