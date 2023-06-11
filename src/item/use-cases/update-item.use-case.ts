import { Injectable, Provider } from '@nestjs/common';
import { IUpdateItemUseCase } from './contract/iupdate-item.use-case';
import { IUpdateItemPayload } from '../shared/iupdate-item.payload';
import { ItemEntity } from '../entities/item.entity';
import { IItemRepository } from '../repositories/contract/iitem.repository';

@Injectable()
export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  execute(id: number, dto: IUpdateItemPayload): Promise<ItemEntity> {
    //TRATAMENTO DE ERRO

    return this.itemRepository.update(id, dto);
  }

  //IMPLEMENTAR AS VALIDACOES AQUI
}

export const UpdateItemUseCaseProvider: Provider<IUpdateItemUseCase> = {
  provide: IUpdateItemUseCase,
  useClass: UpdateItemUseCase,
};
