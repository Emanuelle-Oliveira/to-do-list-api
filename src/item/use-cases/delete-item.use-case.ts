import { Injectable, Provider } from '@nestjs/common';
import { ItemEntity } from '../entities/item.entity';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { IDeleteItemUseCase } from './contract/idelete-item.use-case';

@Injectable()
export class DeleteItemUseCase implements IDeleteItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(id: number): Promise<ItemEntity> {
    // VALIDAÇÃO
    // Se o id informado está no banco

    const item = await this.itemRepository.getOne(id);
    const items = await this.itemRepository.getByList(item.listId);

    // Atualizando orders
    for (let i = item.order; i < items.length; i++) {
      items[i] = await this.itemRepository.updateOrder(
        items[i].id,
        items[i].order - 1,
      );
    }

    return this.itemRepository.delete(id);
  }
}

export const DeleteItemUseCaseProvider: Provider<IDeleteItemUseCase> = {
  provide: IDeleteItemUseCase,
  useClass: DeleteItemUseCase,
};
