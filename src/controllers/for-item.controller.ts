import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {FormItem} from '../models';
import {FormItemRepository} from '../repositories';

export class ForItemController {
  constructor(
    @repository(FormItemRepository)
    public formItemRepository : FormItemRepository,
  ) {}

  @post('/form-items')
  @response(200, {
    description: 'FormItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormItem, {
            title: 'NewFormItem',
            exclude: ['id'],
          }),
        },
      },
    })
    formItem: Omit<FormItem, 'id'>,
  ): Promise<FormItem> {
    return this.formItemRepository.create(formItem);
  }

  @get('/form-items/count')
  @response(200, {
    description: 'FormItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FormItem) where?: Where<FormItem>,
  ): Promise<Count> {
    return this.formItemRepository.count(where);
  }

  @get('/form-items')
  @response(200, {
    description: 'Array of FormItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FormItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FormItem) filter?: Filter<FormItem>,
  ): Promise<FormItem[]> {
    return this.formItemRepository.find(filter);
  }

  @patch('/form-items')
  @response(200, {
    description: 'FormItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormItem, {partial: true}),
        },
      },
    })
    formItem: FormItem,
    @param.where(FormItem) where?: Where<FormItem>,
  ): Promise<Count> {
    return this.formItemRepository.updateAll(formItem, where);
  }

  @get('/form-items/{id}')
  @response(200, {
    description: 'FormItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FormItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FormItem, {exclude: 'where'}) filter?: FilterExcludingWhere<FormItem>
  ): Promise<FormItem> {
    return this.formItemRepository.findById(id, filter);
  }

  @patch('/form-items/{id}')
  @response(204, {
    description: 'FormItem PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormItem, {partial: true}),
        },
      },
    })
    formItem: FormItem,
  ): Promise<void> {
    await this.formItemRepository.updateById(id, formItem);
  }

  @put('/form-items/{id}')
  @response(204, {
    description: 'FormItem PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() formItem: FormItem,
  ): Promise<void> {
    await this.formItemRepository.replaceById(id, formItem);
  }

  @del('/form-items/{id}')
  @response(204, {
    description: 'FormItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.formItemRepository.deleteById(id);
  }
}
