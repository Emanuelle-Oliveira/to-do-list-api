import { Injectable, Provider } from '@nestjs/common';
import { IUpdateOrderListPayload } from '../shared/iupdate-order-list.payload';
import { ListEntity } from '../entities/list.entity';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { IUpdateOrderListUseCase } from './contract/iupdate-order-list.use-case';

@Injectable()
export class UpdateOrderListUseCase implements IUpdateOrderListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number, dto: IUpdateOrderListPayload): Promise<ListEntity> {
    // VALIDAÇÃO
    // Se o id informado está no banco
    // Se o order atual cadastrado para esse id é igual a currentOrder
    // Se targetOrder é menor ou igual a quantidade de lista

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
