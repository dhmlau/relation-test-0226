import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FormItem,
  Form,
} from '../models';
import {FormItemRepository} from '../repositories';

export class FormItemFormController {
  constructor(
    @repository(FormItemRepository)
    public formItemRepository: FormItemRepository,
  ) { }

  @get('/form-items/{id}/form', {
    responses: {
      '200': {
        description: 'Form belonging to FormItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Form)},
          },
        },
      },
    },
  })
  async getForm(
    @param.path.number('id') id: typeof FormItem.prototype.id,
  ): Promise<Form> {
    return this.formItemRepository.form(id);
  }
}
