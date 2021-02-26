import {Entity, model, property, hasMany} from '@loopback/repository';
import {FormItem} from './form-item.model';

@model()
export class Form extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'formid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  formid: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'formtitle', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  formtitle: string;

  @hasMany(() => FormItem)
  formItems: FormItem[];

  constructor(data?: Partial<Form>) {
    super(data);
  }
}

export interface FormRelations {
  // describe navigational properties here
}

export type FormWithRelations = Form & FormRelations;
