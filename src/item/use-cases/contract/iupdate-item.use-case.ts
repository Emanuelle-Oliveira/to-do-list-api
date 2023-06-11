import { IUpdateItemPayload } from '../../shared/iupdate-item.payload';
import { ItemEntity } from '../../entities/item.entity';

export abstract class IUpdateItemUseCase {
  abstract execute(id: number, dto: IUpdateItemPayload): Promise<ItemEntity>;
}
