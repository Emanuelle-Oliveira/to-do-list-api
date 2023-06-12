import { ItemEntity } from '../../entities/item.entity';
import { IUpdateOrderItemPayload } from '../../shared/iupdated-order-item.payload';

export abstract class IUpdateOrderItemUseCase {
  abstract execute(
    id: number,
    dto: IUpdateOrderItemPayload,
  ): Promise<ItemEntity>;
}
