import { feature } from './feature';
import { model } from './model';
import { Make } from './make';
import { Contacts } from './contacts';

export class SaveVehicle {
  id: number;
  makeId: number;
  modelId: number;
  features: number[];
  isRegistered: boolean;
  contact: Contacts;
}
