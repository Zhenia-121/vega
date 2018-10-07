import { KeyValuePair } from './key-value-pair';
import { Contacts } from './contacts';

export class Vehicle {
  id ?: number;
  make: KeyValuePair;
  models: KeyValuePair;
  lastUpdate: string;
  features: KeyValuePair[];
  isRegistered: boolean;
  contact: Contacts;
}
