import { Injectable, Provider } from '@nestjs/common';
import { IUpdateItemUseCase } from './contract/iupdate-item.use-case';
import { IUpdateItemPayload } from '../shared/iupdate-item.payload';
import { ItemEntity } from '../entities/item.entity';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { NotFoundError } from '../../common/errors/types/not-found-error';

@Injectable()
export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(id: number, dto: IUpdateItemPayload): Promise<ItemEntity> {
    // VALIDAÇÃO
    // Se a data final é maior ou igual que a inicial
    const item = await this.itemRepository.getOne(id);
    if (!item) {
      throw new NotFoundError('Item não encontrado.');
    }

    return this.itemRepository.update(id, dto);
  }
}

export const UpdateItemUseCaseProvider: Provider<IUpdateItemUseCase> = {
  provide: IUpdateItemUseCase,
  useClass: UpdateItemUseCase,
};
