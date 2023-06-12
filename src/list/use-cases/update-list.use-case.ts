import { Injectable, Provider } from '@nestjs/common';
import { IUpdateListUseCase } from './contract/iupdate-list.use-case';
import { IListRepository } from '../repositories/contract/ilist.repository';
import { IUpdateListPayload } from '../shared/iupdate-list.payload';
import { ListEntity } from '../entities/list.entity';

@Injectable()
export class UpdateListUseCase implements IUpdateListUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  execute(id: number, dto: IUpdateListPayload): Promise<ListEntity> {
    // VALIDAÇÃO
    // Se o id informado está no banco

    return this.listRepository.update(id, dto);
  }
}

export const UpdateListUseCaseProvider: Provider<IUpdateListUseCase> = {
  provide: IUpdateListUseCase,
  useClass: UpdateListUseCase,
};
