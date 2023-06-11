import { ICreateItemPayload } from '../../shared/icreate-item-payload';
import { ItemEntity } from '../../entities/item.entity';

export abstract class ICreateItemUseCase {
  abstract execute(dto: ICreateItemPayload): Promise<ItemEntity>;
}
