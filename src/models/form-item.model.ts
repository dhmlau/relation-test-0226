import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Form} from './form.model';

@model()
export class FormItem extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 512,
    postgresql: {columnName: 'itemdescription', dataType: 'character varying', dataLength: 512, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  itemdescription: string;

  @belongsTo(() => Form)
  formId: number;

  constructor(data?: Partial<FormItem>) {
    super(data);
  }
}

export interface FormItemRelations {
  // describe navigational properties here
}

export type FormItemWithRelations = FormItem & FormItemRelations;
