import { Injectable, Provider } from '@nestjs/common';
import { ItemEntity } from '../entities/item.entity';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { IDeleteItemUseCase } from './contract/idelete-item.use-case';

@Injectable()
export class DeleteItemUseCase implements IDeleteItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(id: number): Promise<ItemEntity> {
    return this.itemRepository.delete(id);
  }
}

export const DeleteItemUseCaseProvider: Provider<IDeleteItemUseCase> = {
  provide: IDeleteItemUseCase,
  useClass: DeleteItemUseCase,
};
