import { Injectable, Provider } from '@nestjs/common';
import { ICreateItemUseCase } from './contract/icreate-item.use-case';
import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { IItemRepository } from '../repositories/contract/iitem.repository';
import { ItemEntity } from '../entities/item.entity';

@Injectable()
export class CreateItemUseCase implements ICreateItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  execute(dto: ICreateItemPayload): Promise<ItemEntity> {
    //TRATAMENTO DE ERRO

    return this.itemRepository.create(dto);
  }

  //IMPLEMENTAR O TRATAMENTO DE ERRO CASO NÃO EXISTA ESSA LISTA COM ESSE ID
}

export const CreateItemUseCaseProvider: Provider<ICreateItemUseCase> = {
  provide: ICreateItemUseCase,
  useClass: CreateItemUseCase,
};
