import { Injectable, Provider } from '@nestjs/common';
import { ICreateItemUseCase } from './contract/icreate-item.use-case';
import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';

@Injectable()
export class CreateItemUseCase implements ICreateItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(dto: ICreateItemPayload): Promise<ItemEntity> {
    // VALIDAÇÃO
    // Se o idList informado está no banco

    const order = await this.itemRepository.count(dto.listId);

    return this.itemRepository.create(dto, order);
  }
}

export const CreateItemUseCaseProvider: Provider<ICreateItemUseCase> = {
  provide: ICreateItemUseCase,
  useClass: CreateItemUseCase,
};
