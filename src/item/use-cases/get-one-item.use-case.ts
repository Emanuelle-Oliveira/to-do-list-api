import { Injectable, Provider } from '@nestjs/common';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';
import { IGetOneItemUseCase } from './contract/iget-one-item.use-case';
import { NotFoundError } from '../../common/errors/types/not-found-error';

@Injectable()
export class GetOneItemUseCase implements IGetOneItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(id: number): Promise<ItemEntity> {
    const item = await this.itemRepository.getOne(id);

    if (!item) {
      throw new NotFoundError('Item não encontrado.');
    }
    return item;
  }
}

export const GetOneItemUseCaseProvider: Provider<IGetOneItemUseCase> = {
  provide: IGetOneItemUseCase,
  useClass: GetOneItemUseCase,
};
