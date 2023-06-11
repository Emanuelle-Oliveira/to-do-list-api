import { ICreateItemPayload } from '../../shared/icreate-item-payload';
import { ItemEntity } from '../../entities/item.entity';
import { IUpdateItemPayload } from '../../shared/iupdate-item.payload';

export abstract class IItemRepository {
  abstract create(dto: ICreateItemPayload): Promise<ItemEntity>;
  abstract update(id: number, dto: IUpdateItemPayload): Promise<ItemEntity>;
  abstract getOne(id: number): Promise<ItemEntity>;
  abstract delete(id: number): Promise<ItemEntity>;
}
