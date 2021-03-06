import { UseCase } from '../../../common/usecase/UseCase';
import { EditMediaPort } from '../port/usecase/EditMediaPort';
import { MediaUseCaseDto } from './dto/MediaUseCaseDto';

export interface EditMediaUseCase extends UseCase<EditMediaPort, MediaUseCaseDto> {}
