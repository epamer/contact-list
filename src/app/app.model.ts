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
  public id: number | null;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public email: string;
  public address: string;
  public note: string;

  constructor({
    id,
    firstName,
    lastName,
    phone,
    email,
    address,
    note,
  }: Contact) {
    Object.assign(this, {
      id,
      firstName,
      lastName,
      phone,
      email,
      address,
      note,
    });
  }

  static getInitialState(): Contact {
    const initialState: any = new Map([
      ['id', null],
      ['firstName', ''],
      ['lastName', ''],
      ['phone', ''],
      ['email', ''],
      ['address', ''],
      ['note', ''],
    ]);

    const values = initialState.values();
    return new this(values);
  }
}

export interface ContactsByGroup {
  [key: string]: Contact[];
}

export enum Mode {
  DETAILS = 'details',
  CREATE = 'create',
  EDIT = 'edit',
}

export interface DialogData {
  title?: string;
  text?: string;
  noBtnTitle?: string;
  yesBtnTitle?: string;
}
