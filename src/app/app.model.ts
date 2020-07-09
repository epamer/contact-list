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

/**
 * @todo - find appropriate place for the things below
 */

export enum Mode {
  DETAILS = 'details',
  CREATE = 'create',
  EDIT = 'edit',
}

// export interface ModeTypes {
//   [key: string]: boolean;
// }

// export interface FormFields {
//   firstName: ModeTypes;
//   lastName: ModeTypes;
//   phone: ModeTypes;
//   email: ModeTypes;
//   address: ModeTypes;
//   note: ModeTypes;
// }

// export interface ModeConfig {
//   displayInputLabels: ModeTypes;
//   displayBtnEdit: ModeTypes;
//   readOnlyFields: Partial<FormFields>;
// }

// export class ModeConfig implements ModeConfig {
//   public displayInputLabels: ModeTypes;
//   public displayBtnEdit: ModeTypes;
//   public readOnlyFields: Partial<FormFields>;

//   constructor({
//     displayInputLabels,
//     displayBtnEdit,
//     readOnlyFields,
//   }: ModeConfig) {
//     Object.assign(this, { displayInputLabels, displayBtnEdit, readOnlyFields });
//   }

//   static init() {
//     const config = {
//       displayInputLabels: {
//         edit: true,
//         create: true,
//       },
//       displayBtnEdit: {
//         details: true,
//       },
//       readOnlyFields: {
//         phone: {
//           edit: true,
//         },

//         email: {
//           edit: true,
//         },
//         address: {
//           edit: true,
//         },
//         note: {
//           edit: true,
//         },
//       },
//     };
//     return new this(config);
//   }
// }
