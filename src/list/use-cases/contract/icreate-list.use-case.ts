import { ICreateListPayload } from '../../shared/icreate-list-payload';
import { ListEntity } from '../../entities/list.entity';

export abstract class ICreateListUseCase {
  abstract execute(dto: ICreateListPayload): Promise<ListEntity>;
}
