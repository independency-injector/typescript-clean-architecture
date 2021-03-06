import { UseCase } from '../../../common/usecase/UseCase';
import { GetMediaListPort } from '../port/usecase/GetMediaListPort';
import { MediaUseCaseDto } from './dto/MediaUseCaseDto';

export interface GetMediaListUseCase extends UseCase<GetMediaListPort, MediaUseCaseDto[]> {}
