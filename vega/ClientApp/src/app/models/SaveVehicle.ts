import { feature } from './feature';
import { model } from './model';
import { make } from './make';
import { Contacts } from './contacts';

export class SaveVehicle {
  modelId: number;
  features: number[];
  isRegistered: boolean;
  contact: Contacts;
}
