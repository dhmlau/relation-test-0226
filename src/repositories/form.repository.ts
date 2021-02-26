import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DsDataSource} from '../datasources';
import {Form, FormRelations, FormItem} from '../models';
import {FormItemRepository} from './form-item.repository';

export class FormRepository extends DefaultCrudRepository<
  Form,
  typeof Form.prototype.formid,
  FormRelations
> {

  public readonly formItems: HasManyRepositoryFactory<FormItem, typeof Form.prototype.formid>;

  constructor(
    @inject('datasources.ds') dataSource: DsDataSource, @repository.getter('FormItemRepository') protected formItemRepositoryGetter: Getter<FormItemRepository>,
  ) {
    super(Form, dataSource);
    this.formItems = this.createHasManyRepositoryFactoryFor('formItems', formItemRepositoryGetter,);
    this.registerInclusionResolver('formItems', this.formItems.inclusionResolver);
  }
}
