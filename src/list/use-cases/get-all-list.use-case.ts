import { IGetAllListUseCase } from './contract/iget-all-list.use-case';
import { Injectable, Provider } from '@nestjs/common';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';

@Injectable()
export class GetAllListUseCase implements IGetAllListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  execute(): Promise<ListEntity[]> {
    return this.listRepository.getAll();
  }
}

export const GetAllListUseCaseProvider: Provider<IGetAllListUseCase> = {
  provide: IGetAllListUseCase,
  useClass: GetAllListUseCase,
};
