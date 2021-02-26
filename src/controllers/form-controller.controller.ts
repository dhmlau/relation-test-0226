import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Form} from '../models';
import {FormRepository} from '../repositories';

export class FormControllerController {
  constructor(
    @repository(FormRepository)
    public formRepository : FormRepository,
  ) {}

  @post('/forms')
  @response(200, {
    description: 'Form model instance',
    content: {'application/json': {schema: getModelSchemaRef(Form)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Form, {
            title: 'NewForm'
          }),
        },
      },
    })
    form: Omit<Form, 'formid'>,
  ): Promise<Form> {
    return this.formRepository.create(form);
  }

  @get('/forms/count')
  @response(200, {
    description: 'Form model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Form) where?: Where<Form>,
  ): Promise<Count> {
    return this.formRepository.count(where);
  }

  @get('/forms')
  @response(200, {
    description: 'Array of Form model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Form, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Form) filter?: Filter<Form>,
  ): Promise<Form[]> {
    return this.formRepository.find(filter);
  }

  @patch('/forms')
  @response(200, {
    description: 'Form PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Form, {partial: true}),
        },
      },
    })
    form: Form,
    @param.where(Form) where?: Where<Form>,
  ): Promise<Count> {
    return this.formRepository.updateAll(form, where);
  }

  @get('/forms/{id}')
  @response(200, {
    description: 'Form model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Form, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Form, {exclude: 'where'}) filter?: FilterExcludingWhere<Form>
  ): Promise<Form> {
    return this.formRepository.findById(id, filter);
  }

  @patch('/forms/{id}')
  @response(204, {
    description: 'Form PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Form, {partial: true}),
        },
      },
    })
    form: Form,
  ): Promise<void> {
    await this.formRepository.updateById(id, form);
  }

  @put('/forms/{id}')
  @response(204, {
    description: 'Form PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() form: Form,
  ): Promise<void> {
    await this.formRepository.replaceById(id, form);
  }

  @del('/forms/{id}')
  @response(204, {
    description: 'Form DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.formRepository.deleteById(id);
  }
}
