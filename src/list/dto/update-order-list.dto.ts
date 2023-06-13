import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdateOrderListPayload } from '../shared/iupdate-order-list.payload';

export class UpdateOrderListDto implements IUpdateOrderListPayload {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'A ordem atual não pode ser vazia.' })
  @IsNumber()
  currentOrder: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'A ordem alvo não pode ser vazia.' })
  @IsNumber()
  targetOrder: number;
}
