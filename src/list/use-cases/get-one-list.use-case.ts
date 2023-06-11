import { Injectable, Provider } from '@nestjs/common';

import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';
import { IGetOneListUseCase } from './contract/iget-one-list.use-case';

@Injectable()
export class GetOneListUseCase implements IGetOneListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number): Promise<ListEntity> {
    return this.listRepository.getOne(id);
  }
}

export const GetOneListUseCaseProvider: Provider<IGetOneListUseCase> = {
  provide: IGetOneListUseCase,
  useClass: GetOneListUseCase,
};
