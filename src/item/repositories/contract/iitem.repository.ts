import { ICreateItemPayload } from '../../shared/icreate-item-payload';
import { ItemEntity } from '../../entities/item.entity';
import { IUpdateItemPayload } from '../../shared/iupdate-item.payload';

export abstract class IItemRepository {
  abstract create(dto: ICreateItemPayload, order: number): Promise<ItemEntity>;
  abstract count(listId: number): Promise<number>;
  abstract update(id: number, dto: IUpdateItemPayload): Promise<ItemEntity>;
  abstract updateOrder(
    id: number,
    order: number,
    listId?: number,
  ): Promise<ItemEntity>;
  abstract getOne(id: number): Promise<ItemEntity>;
  abstract getByList(listId: number): Promise<ItemEntity[]>;
  abstract delete(id: number): Promise<ItemEntity>;
}
