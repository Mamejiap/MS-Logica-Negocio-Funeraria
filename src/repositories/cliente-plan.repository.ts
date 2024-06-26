import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlproyDataSource} from '../datasources';
import {ClientePlan, ClientePlanRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class ClientePlanRepository extends DefaultCrudRepository<
  ClientePlan,
  typeof ClientePlan.prototype.id,
  ClientePlanRelations
> {

  public readonly factura: HasOneRepositoryFactory<Factura, typeof ClientePlan.prototype.id>;

  constructor(
    @inject('datasources.mysqlproy') dataSource: MysqlproyDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(ClientePlan, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
