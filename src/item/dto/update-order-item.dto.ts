import { IUpdateOrderItemPayload } from '../shared/iupdate-order-item.payload';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto implements IUpdateOrderItemPayload {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'O id da lista atual não pode ser vazio.' })
  @IsNumber()
  currentListId: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'A ordem atual não pode ser vazia.' })
  @IsNumber()
  currentOrder: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'O id da lista alvo não pode ser vazio.' })
  @IsNumber()
  targetListId: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'A ordem alvo não pode ser vazia.' })
  @IsNumber()
  targetOrder: number;
}
