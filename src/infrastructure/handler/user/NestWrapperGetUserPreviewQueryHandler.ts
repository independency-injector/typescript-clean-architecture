import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { GetUserPreviewQuery } from '../../../core/common/cqers/query/queries/user/GetUserPreviewQuery';
import { GetUserPreviewQueryHandler } from '../../../core/domain/user/handler/GetUserPreviewQueryHandler';
import { GetUserPreviewQueryResult } from '../../../core/common/cqers/query/queries/user/result/GetUserPreviewQueryResult';
import { Optional } from '../../../core/common/type/CommonTypes';
import { UserDITokens } from '../../../core/domain/user/di/UserDITokens';

@Injectable()
@QueryHandler(GetUserPreviewQuery)
export class NestWrapperGetUserPreviewQueryHandler implements IQueryHandler {
  
  constructor(
    @Inject(UserDITokens.GetUserPreviewQueryHandler)
    private readonly handleService: GetUserPreviewQueryHandler
  ) {}

  public async execute(query: GetUserPreviewQuery): Promise<Optional<GetUserPreviewQueryResult>> {
    return this.handleService.handle(query);
  }
  
}
