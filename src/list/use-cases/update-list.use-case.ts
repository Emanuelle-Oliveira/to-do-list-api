import { Injectable, Provider } from '@nestjs/common';
import { IUpdateListUseCase } from './contract/iupdate-list.use-case';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { IUpdateListPayload } from '../shared/iupdate-list.payload';
import { ListEntity } from '../entities/list.entity';
import { NotFoundError } from '../../common/errors/types/not-found-error';

@Injectable()
export class UpdateListUseCase implements IUpdateListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number, dto: IUpdateListPayload): Promise<ListEntity> {
    const list = await this.listRepository.getOne(id);
    if (!list) {
      throw new NotFoundError('Lista não encontrada.');
    }

    return await this.listRepository.update(id, dto);
  }
}

export const UpdateListUseCaseProvider: Provider<IUpdateListUseCase> = {
  provide: IUpdateListUseCase,
  useClass: UpdateListUseCase,
};
