import { Injectable, Provider } from '@nestjs/common';
import { ICreateItemUseCase } from './contract/icreate-item.use-case';
import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';
import { NotFoundError } from '../../common/errors/types/not-found-error';
import { IListRepository } from '../../list/repositories/contract/ilist.repository';

@Injectable()
export class CreateItemUseCase implements ICreateItemUseCase {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly listRepository: IListRepository,
  ) {}

  async execute(dto: ICreateItemPayload): Promise<ItemEntity> {
    const list = await this.listRepository.getOne(dto.listId);
    if (!list) {
      throw new NotFoundError('Lista não encontrada, listId inválido.');
    }

    const order = await this.itemRepository.count(dto.listId);

    return this.itemRepository.create(dto, order);
  }
}

export const CreateItemUseCaseProvider: Provider<ICreateItemUseCase> = {
  provide: ICreateItemUseCase,
  useClass: CreateItemUseCase,
};
