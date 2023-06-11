import { ICreateListPayload } from '../../shared/icreate-list-payload';
import { ListEntity } from '../../entities/list.entity';

export abstract class IListRepository {
  abstract create(dto: ICreateListPayload): Promise<ListEntity>;
  abstract getAll(): Promise<ListEntity[]>;
  abstract getOne(id: number): Promise<ListEntity>;
  abstract delete(id: number): Promise<ListEntity>;
}
