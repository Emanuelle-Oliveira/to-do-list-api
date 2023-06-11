import { ListEntity } from '../../entities/list.entity';

export abstract class IGetAllListUseCase {
  abstract execute(): Promise<ListEntity[]>;
}
