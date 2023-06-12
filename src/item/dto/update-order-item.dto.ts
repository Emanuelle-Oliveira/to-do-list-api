import { IUpdateOrderItemPayload } from '../shared/iupdated-order-item.payload';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderItemDto implements IUpdateOrderItemPayload {
  @IsNotEmpty({ message: 'O id da lista atual não pode ser vazio.' })
  @IsNumber()
  currentListId: number;

  @IsNotEmpty({ message: 'A ordem atual não pode ser vazia.' })
  @IsNumber()
  currentOrder: number;

  @IsNotEmpty({ message: 'O id da lista alvo não pode ser vazio.' })
  @IsNumber()
  targetListId: number;

  @IsNotEmpty({ message: 'A ordem alvo não pode ser vazia.' })
  @IsNumber()
  targetOrder: number;
}
