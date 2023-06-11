import { IUpdateOrderItemPayload } from '../shared/iupdated-order-item.payload';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderItemDto implements IUpdateOrderItemPayload {
  @IsNumber()
  @IsNotEmpty()
  currentListId: number;

  @IsNumber()
  @IsNotEmpty()
  currentOrder: number;

  @IsNumber()
  @IsNotEmpty()
  targetListId: number;

  @IsNumber()
  @IsNotEmpty()
  targetOrder: number;
}
