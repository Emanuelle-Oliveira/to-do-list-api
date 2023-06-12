import { Injectable, Provider } from '@nestjs/common';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';
import { IGetOneListUseCase } from './contract/iget-one-list.use-case';
import { NotFoundError } from '../../common/errors/types/not-found-error';

@Injectable()
export class GetOneListUseCase implements IGetOneListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number): Promise<ListEntity> {
    // VALIDAÇÃO
    // Se o id informado está no banco

    const list = await this.listRepository.getOne(id);

    if (!list) {
      throw new NotFoundError('Lista não encontrada.');
    }
    return list;
  }
}

export const GetOneListUseCaseProvider: Provider<IGetOneListUseCase> = {
  provide: IGetOneListUseCase,
  useClass: GetOneListUseCase,
};
