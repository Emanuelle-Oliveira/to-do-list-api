import { Injectable, Provider } from '@nestjs/common';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';
import { IUpdateOrderItemUseCase } from './contract/iupdate-order-item.use-case';
import { IUpdateOrderItemPayload } from '../shared/iupdated-order-item.payload';

@Injectable()
export class UpdateOrderItemUseCase implements IUpdateOrderItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(
    id: number,
    dto: IUpdateOrderItemPayload,
  ): Promise<ItemEntity[]> {
    // Mudança dentro da própria lista
    if (dto.currentListId === dto.targetListId) {
      const items = await this.itemRepository.getByList(dto.currentListId);

      if (dto.currentOrder > dto.targetOrder) {
        for (let i = dto.targetOrder; i <= dto.currentOrder; i++) {
          if (i === dto.currentOrder) {
            items[i] = await this.itemRepository.updateOrder(
              items[i].id,
              dto.targetOrder,
            );
            //items[i].order = dto.targetOrder;
          } else {
            items[i] = await this.itemRepository.updateOrder(
              items[i].id,
              items[i].order + 1,
            );
            //items[i].order = items[i].order + 1;
          }
        }
      } else if (dto.targetOrder > dto.currentOrder) {
        for (let i = dto.currentOrder; i <= dto.targetOrder; i++) {
          if (i === dto.currentOrder) {
            items[i] = await this.itemRepository.updateOrder(
              items[i].id,
              dto.targetOrder,
            );
            //items[i].order = dto.targetOrder;
          } else {
            items[i] = await this.itemRepository.updateOrder(
              items[i].id,
              items[i].order - 1,
            );
            //items[i].order = items[i].order - 1;
          }
        }
      }
      return items;
    } else {
      // Mudança de lista
    }
  }
}

export const UpdateOrderItemUseCaseProvider: Provider<IUpdateOrderItemUseCase> =
  {
    provide: IUpdateOrderItemUseCase,
    useClass: UpdateOrderItemUseCase,
  };
