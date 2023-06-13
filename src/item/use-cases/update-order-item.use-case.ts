import { Injectable, Provider } from '@nestjs/common';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';
import { IUpdateOrderItemUseCase } from './contract/iupdate-order-item.use-case';
import { IUpdateOrderItemPayload } from '../shared/iupdate-order-item.payload';
import { NotFoundError } from '../../common/errors/types/not-found-error';
import { ConflictError } from '../../common/errors/types/conflict-error';
import { IListRepository } from '../../list/repositories/contract/ilist.repository';

@Injectable()
export class UpdateOrderItemUseCase implements IUpdateOrderItemUseCase {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly listRepository: IListRepository,
  ) {}

  async execute(id: number, dto: IUpdateOrderItemPayload): Promise<ItemEntity> {
    const returnedItem = await this.itemRepository.getOne(id);
    if (!returnedItem) {
      throw new NotFoundError('Item não encontrado.');
    }

    if (returnedItem.order !== dto.currentOrder) {
      throw new ConflictError('Ordem atual inválida.');
    }

    if (returnedItem.listId !== dto.currentListId) {
      throw new ConflictError('Lista atual inválida.');
    }

    const returnedList = await this.listRepository.getOne(dto.targetListId);
    if (!returnedList) {
      throw new ConflictError('Lista alvo inválida.');
    }

    const amountOfItems = await this.itemRepository.count(dto.targetListId);
    if (dto.targetOrder >= amountOfItems || dto.targetOrder < 0) {
      throw new ConflictError('Ordem alvo inválida.');
    }

    const itemsCurrentList = await this.itemRepository.getByList(
      dto.currentListId,
    );

    if (dto.currentListId === dto.targetListId) {
      if (dto.currentOrder > dto.targetOrder) {
        for (let i = dto.targetOrder; i <= dto.currentOrder; i++) {
          if (i === dto.currentOrder) {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              dto.targetOrder,
            );
          } else {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              itemsCurrentList[i].order + 1,
            );
          }
        }
      } else if (dto.targetOrder > dto.currentOrder) {
        for (let i = dto.currentOrder; i <= dto.targetOrder; i++) {
          if (i === dto.currentOrder) {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              dto.targetOrder,
            );
          } else {
            itemsCurrentList[i] = await this.itemRepository.updateOrder(
              itemsCurrentList[i].id,
              itemsCurrentList[i].order - 1,
            );
          }
        }
      }
    } else {
      for (let i = dto.currentOrder; i < itemsCurrentList.length; i++) {
        itemsCurrentList[i] = await this.itemRepository.updateOrder(
          itemsCurrentList[i].id,
          itemsCurrentList[i].order - 1,
        );
      }

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
