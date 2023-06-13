import { ICreateListPayload } from '../../shared/icreate-list-payload';
import { ListEntity } from '../../entities/list.entity';
import { IUpdateListPayload } from '../../shared/iupdate-list.payload';

export abstract class IListRepository {
  abstract create(dto: ICreateListPayload, order: number): Promise<ListEntity>;
  abstract count(): Promise<number>;
  abstract update(id: number, dto: IUpdateListPayload): Promise<ListEntity>;
  abstract updateOrder(id: number, order: number): Promise<ListEntity>;
  abstract getAll(): Promise<ListEntity[]>;
  abstract getOne(id: number): Promise<ListEntity>;
  abstract delete(id: number): Promise<ListEntity>;
}
