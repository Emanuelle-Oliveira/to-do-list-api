import { ListEntity } from '../../entities/list.entity';

export abstract class IGetOneListUseCase {
  abstract execute(id: number): Promise<ListEntity>;
}
