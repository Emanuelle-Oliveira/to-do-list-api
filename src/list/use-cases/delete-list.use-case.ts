import { IDeleteListUseCase } from './contract/idelete-list.use-case';
import { Injectable, Provider } from '@nestjs/common';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';
import { NotFoundError } from '../../common/errors/types/not-found-error';

@Injectable()
export class DeleteListUseCase implements IDeleteListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number): Promise<ListEntity> {
    const list = await this.listRepository.getOne(id);
    if (!list) {
      throw new NotFoundError('Lista não encontrada.');
    }

    const lists = await this.listRepository.getAll();

    for (let i = list.order; i < lists.length; i++) {
      lists[i] = await this.listRepository.updateOrder(
        lists[i].id,
        lists[i].order - 1,
      );
    }

    return this.listRepository.delete(id);
  }
}

export const DeleteListUseCaseProvider: Provider<IDeleteListUseCase> = {
  provide: IDeleteListUseCase,
  useClass: DeleteListUseCase,
};
