export interface User {
  firstName: string;
  otherNames: string;
  address: Address;
  mobile: string;
  email: string;
  company: string;
  preferences: UserPreferences;
}

export interface Address {
  street: string;
  town: string;
  county: string;
  postcode: string;
}

export interface UserPreferences {
  contact: ContactPreferences;
}

export interface ContactPreferences {
  mail: boolean;
  sms: boolean;
}
