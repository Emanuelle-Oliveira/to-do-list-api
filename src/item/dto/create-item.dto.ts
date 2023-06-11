import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto implements ICreateItemPayload {
  @IsString()
  @IsNotEmpty()
  titleItem: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsNumber()
  @IsNotEmpty()
  listId: number;
}
