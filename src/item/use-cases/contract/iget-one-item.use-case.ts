import { ItemEntity } from '../../entities/item.entity';

export abstract class IGetOneItemUseCase {
  abstract execute(id: number): Promise<ItemEntity>;
}
