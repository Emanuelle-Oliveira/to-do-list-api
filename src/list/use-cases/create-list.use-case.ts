import { ICreateListUseCase } from './contract/icreate-list.use-case';
import { ICreateListPayload } from '../shared/icreate-list-payload';
import { Injectable, Provider } from '@nestjs/common';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { ListEntity } from '../entities/list.entity';
@Injectable()
export class CreateListUseCase implements ICreateListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(dto: ICreateListPayload): Promise<ListEntity> {
    const order = await this.listRepository.count();
    return this.listRepository.create(dto, order);
  }
}

export const CreateListUseCaseProvider: Provider<ICreateListUseCase> = {
  provide: ICreateListUseCase,
  useClass: CreateListUseCase,
};
