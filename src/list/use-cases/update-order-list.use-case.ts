import { Injectable, Provider } from '@nestjs/common';
import { IUpdateOrderListPayload } from '../shared/iupdate-order-list.payload';
import { ListEntity } from '../entities/list.entity';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { IUpdateOrderListUseCase } from './contract/iupdate-order-list.use-case';
import { NotFoundError } from '../../common/errors/types/not-found-error';
import { ConflictError } from '../../common/errors/types/conflict-error';

@Injectable()
export class UpdateOrderListUseCase implements IUpdateOrderListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number, dto: IUpdateOrderListPayload): Promise<ListEntity> {
    const returnedList = await this.listRepository.getOne(id);
    if (!returnedList) {
      throw new NotFoundError('Lista não encontrada.');
    }

    if (returnedList.order !== dto.currentOrder) {
      throw new ConflictError('Ordem atual inválida.');
    }

    const amountOfLists = await this.listRepository.count();
    if (dto.targetOrder >= amountOfLists || dto.targetOrder < 0) {
      throw new ConflictError('Ordem alvo inválida.');
    }

    const lists = await this.listRepository.getAll();
    let list;

    if (dto.currentOrder > dto.targetOrder) {
      for (let i = dto.targetOrder; i <= dto.currentOrder; i++) {
        if (i === dto.currentOrder) {
          lists[i] = await this.listRepository.updateOrder(
            lists[i].id,
            dto.targetOrder,
          );
          list = lists[i];
        } else {
          lists[i] = await this.listRepository.updateOrder(
            lists[i].id,
            lists[i].order + 1,
          );
        }
      }
    } else {
      for (let i = dto.currentOrder; i <= dto.targetOrder; i++) {
        if (i === dto.currentOrder) {
          lists[i] = await this.listRepository.updateOrder(
            lists[i].id,
            dto.targetOrder,
          );
          list = lists[i];
        } else {
          lists[i] = await this.listRepository.updateOrder(
            lists[i].id,
            lists[i].order - 1,
          );
        }
      }
    }

    return list;
  }
}

export const UpdateOrderListUseCaseProvider: Provider<IUpdateOrderListUseCase> =
  {
    provide: IUpdateOrderListUseCase,
    useClass: UpdateOrderListUseCase,
  };
