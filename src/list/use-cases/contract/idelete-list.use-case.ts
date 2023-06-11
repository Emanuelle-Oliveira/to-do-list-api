import { ListEntity } from '../../entities/list.entity';

export abstract class IDeleteListUseCase {
  abstract execute(id: number): Promise<ListEntity>;
}
