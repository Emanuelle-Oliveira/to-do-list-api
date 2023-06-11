import { ICreateItemPayload } from '../../shared/icreate-item-payload';
import { ItemEntity } from '../../entities/item.entity';

export abstract class IItemRepository {
  abstract create(dto: ICreateItemPayload): Promise<ItemEntity>;
  abstract delete(id: number): Promise<ItemEntity>;
}
