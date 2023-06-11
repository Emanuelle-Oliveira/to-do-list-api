import { ICreateListUseCase } from './contract/icreate-list.use-case';
import { ICreateListPayload } from '../shared/icreate-list-payload';
import { Injectable, Provider } from '@nestjs/common';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';
@Injectable()
export class CreateListUseCase implements ICreateListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  execute(dto: ICreateListPayload): Promise<ListEntity> {
    return this.listRepository.create(dto);
  }
}

export const CreateListUseCaseProvider: Provider<ICreateListUseCase> = {
  provide: ICreateListUseCase,
  useClass: CreateListUseCase,
};
