import { Injectable, Provider } from '@nestjs/common';
import { ICreateItemUseCase } from './contract/icreate-item.use-case';
import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';

@Injectable()
export class CreateItemUseCase implements ICreateItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(dto: ICreateItemPayload): Promise<ItemEntity> {
    //TRATAMENTO DE ERRO

    const order = await this.itemRepository.count(dto.listId);

    return this.itemRepository.create(dto, order);
  }

  //IMPLEMENTAR O TRATAMENTO DE ERRO CASO NÃO EXISTA ESSA LISTA COM ESSE ID
}

export const CreateItemUseCaseProvider: Provider<ICreateItemUseCase> = {
  provide: ICreateItemUseCase,
  useClass: CreateItemUseCase,
};
