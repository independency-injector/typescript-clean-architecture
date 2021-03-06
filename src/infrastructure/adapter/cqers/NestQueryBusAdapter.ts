import { QueryBusPort } from '../../../core/common/port/cqers/QueryBusPort';
import { QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestQueryBusAdapter implements QueryBusPort {
  
  constructor(
    readonly queryBus: QueryBus
  ) {
  }
  
  public async sendQuery<TQuery, TQueryResult>(query: TQuery): Promise<TQueryResult> {
    return this.queryBus.execute(query);
  }
  
}
