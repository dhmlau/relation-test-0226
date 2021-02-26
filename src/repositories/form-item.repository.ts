import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DsDataSource} from '../datasources';
import {FormItem, FormItemRelations, Form} from '../models';
import {FormRepository} from './form.repository';

export class FormItemRepository extends DefaultCrudRepository<
  FormItem,
  typeof FormItem.prototype.id,
  FormItemRelations
> {

  public readonly form: BelongsToAccessor<Form, typeof FormItem.prototype.id>;

  constructor(
    @inject('datasources.ds') dataSource: DsDataSource, @repository.getter('FormRepository') protected formRepositoryGetter: Getter<FormRepository>,
  ) {
    super(FormItem, dataSource);
    this.form = this.createBelongsToAccessorFor('form', formRepositoryGetter,);
    this.registerInclusionResolver('form', this.form.inclusionResolver);
  }
}
