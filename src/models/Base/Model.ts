export interface ModelInterface {
  id: string | number;
  toJSON(): any;
}

export abstract class Model implements ModelInterface {

  constructor(public id: string, ...data: any[]) {
    this.id = id;
    data.forEach((item) => Object.assign(this, item));
  }

  toJSON(): Record<string, any> {
    const { toJSON, ...rest } = this;
    return rest;
  }

}
