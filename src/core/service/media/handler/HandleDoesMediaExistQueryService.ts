import { DoesMediaExistQueryHandler } from '../../../domain/media/handler/DoesMediaExistQueryHandler';
import { MediaRepositoryPort } from '../../../domain/media/port/persistence/MediaRepositoryPort';
import { DoesMediaExistQuery } from '../../../common/cqers/query/queries/media/DoesMediaExistQuery';
import { DoesMediaExistQueryResult } from '../../../common/cqers/query/queries/media/result/DoesMediaExistQueryResult';

export class HandleDoesMediaExistQueryService implements DoesMediaExistQueryHandler {
  
  constructor(
    private readonly mediaRepository: MediaRepositoryPort,
  ) {}

  public async handle(query: DoesMediaExistQuery): Promise<DoesMediaExistQueryResult> {
    const count: number = await this.mediaRepository.countMedias(query.by);
    return DoesMediaExistQueryResult.new(!!count);
  }
  
}
