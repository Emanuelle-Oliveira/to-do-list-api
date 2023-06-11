import { Injectable, Provider } from '@nestjs/common';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';
import { IGetOneItemUseCase } from './contract/iget-one-item.use-case';

@Injectable()
export class GetOneItemUseCase implements IGetOneItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(id: number): Promise<ItemEntity> {
    return this.itemRepository.getOne(id);
  }
}

export const GetOneItemUseCaseProvider: Provider<IGetOneItemUseCase> = {
  provide: IGetOneItemUseCase,
  useClass: GetOneItemUseCase,
};
