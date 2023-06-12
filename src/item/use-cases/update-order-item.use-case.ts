import { Injectable, Provider } from '@nestjs/common';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';
import { IUpdateOrderItemUseCase } from './contract/iupdate-order-item.use-case';
import { IUpdateOrderItemPayload } from '../shared/iupdated-order-item.payload';

@Injectable()
export class UpdateOrderItemUseCase implements IUpdateOrderItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(id: number, dto: IUpdateOrderItemPayload): Promise<ItemEntity> {
    const itemsCurrentList = await this.itemRepository.getByList(
      dto.currentListId,
    );

    // Mudança dentro na própria lista
    if (dto.currentListId === dto.targetListId) {
      if (dto.currentOrder > dto.targetOrder) {
        for (let i = dto.targetOrder; i <= dto.currentOrder; i++) {
          if (i === dto.currentOrder) {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              dto.targetOrder,
            );
            //items[i].order = dto.targetOrder;
          } else {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              itemsCurrentList[i].order + 1,
            );
            //items[i].order = items[i].order + 1;
          }
        }
      } else if (dto.targetOrder > dto.currentOrder) {
        for (let i = dto.currentOrder; i <= dto.targetOrder; i++) {
          if (i === dto.currentOrder) {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              dto.targetOrder,
            );
            //items[i].order = dto.targetOrder;
          } else {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              itemsCurrentList[i].order - 1,
            );
            //items[i].order = items[i].order - 1;
          }
        }
      }
      // Mudança de lista
    } else {
      // Lista atual
      for (let i = dto.currentOrder; i < itemsCurrentList.length; i++) {
        itemsCurrentList[i] = await this.itemRepository.updateOrder(
          itemsCurrentList[i].id,
          itemsCurrentList[i].order - 1,
        );
      }
      // Lista alvo
      const itemsTargetList = await this.itemRepository.getByList(
        dto.targetListId,
      );
      for (let i = dto.targetOrder; i < itemsTargetList.length; i++) {
        itemsTargetList[i] = await this.itemRepository.updateOrder(
          itemsTargetList[i].id,
          itemsTargetList[i].order + 1,
        );
      }
    }
    // Item
    const item = await this.itemRepository.updateOrder(
      id,
      dto.targetOrder,
      dto.targetListId,
    );
    return item;
  }
}

export const UpdateOrderItemUseCaseProvider: Provider<IUpdateOrderItemUseCase> =
  {
    provide: IUpdateOrderItemUseCase,
    useClass: UpdateOrderItemUseCase,
  };
