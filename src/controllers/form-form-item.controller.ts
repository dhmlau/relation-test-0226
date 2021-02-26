import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Form,
  FormItem
} from '../models';
import {FormRepository} from '../repositories';

export class FormFormItemController {
  constructor(
    @repository(FormRepository) protected formRepository: FormRepository,
  ) { }

  @get('/forms/{id}/form-items', {
    responses: {
      '200': {
        description: 'Array of Form has many FormItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FormItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FormItem>,
  ): Promise<FormItem[]> {
    return this.formRepository.formItems(id).find(filter);
  }

  @post('/forms/{id}/form-items', {
    responses: {
      '200': {
        description: 'Form model instance',
        content: {'application/json': {schema: getModelSchemaRef(FormItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Form.prototype.formid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormItem, {
            title: 'NewFormItemInForm',
            optional: ['formId']
          }),
        },
      },
    }) formItem: Omit<FormItem, 'id'>,
  ): Promise<FormItem> {
    return this.formRepository.formItems(id).create(formItem);
  }

  @patch('/forms/{id}/form-items', {
    responses: {
      '200': {
        description: 'Form.FormItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormItem, {partial: true}),
        },
      },
    })
    formItem: Partial<FormItem>,
    @param.query.object('where', getWhereSchemaFor(FormItem)) where?: Where<FormItem>,
  ): Promise<Count> {
    return this.formRepository.formItems(id).patch(formItem, where);
  }

  @del('/forms/{id}/form-items', {
    responses: {
      '200': {
        description: 'Form.FormItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FormItem)) where?: Where<FormItem>,
  ): Promise<Count> {
    return this.formRepository.formItems(id).delete(where);
  }
}
