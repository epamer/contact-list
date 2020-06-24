export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
}

export class Contact implements Contact {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public address: string,
    public note: string
  ) {}
}

export interface ContactsByGroup {
  [key: string]: Contact[];
}
