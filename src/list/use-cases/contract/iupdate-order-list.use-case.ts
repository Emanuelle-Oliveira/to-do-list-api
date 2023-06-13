import { IUpdateOrderListPayload } from '../../shared/iupdate-order-list.payload';
import { ListEntity } from '../../entities/list.entity';

export abstract class IUpdateOrderListUseCase {
  abstract execute(
    id: number,
    dto: IUpdateOrderListPayload,
  ): Promise<ListEntity>;
}
