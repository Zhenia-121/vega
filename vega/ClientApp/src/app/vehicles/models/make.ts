import { model } from './model';
// tslint:disable-next-line:class-name
export class Make {
public id: number;
public name: string;
public models: model[];
constructo(id, name, models) {
  this.id = id;
  this.name = name;
  this.models = models;
}
}
