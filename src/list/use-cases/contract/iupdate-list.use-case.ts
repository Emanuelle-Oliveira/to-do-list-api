import { IUpdateListPayload } from '../../shared/iupdate-list.payload';
import { ListEntity } from '../../entities/list.entity';

export abstract class IUpdateListUseCase {
  abstract execute(id: number, dto: IUpdateListPayload): Promise<ListEntity>;
}
