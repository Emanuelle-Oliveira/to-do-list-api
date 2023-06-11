import { IDeleteListUseCase } from './contract/idelete-list.use-case';
import { Injectable, Provider } from '@nestjs/common';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';

@Injectable()
export class DeleteListUseCase implements IDeleteListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(id: number): Promise<ListEntity> {
    return this.listRepository.delete(id);
  }
}

export const DeleteListUseCaseProvider: Provider<IDeleteListUseCase> = {
  provide: IDeleteListUseCase,
  useClass: DeleteListUseCase,
};
