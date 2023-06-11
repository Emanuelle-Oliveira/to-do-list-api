import { ItemEntity } from '../../entities/item.entity';

export abstract class IDeleteItemUseCase {
  abstract execute(id: number): Promise<ItemEntity>;
}
