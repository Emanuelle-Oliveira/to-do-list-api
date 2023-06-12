import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto implements ICreateItemPayload {
  @IsNotEmpty({ message: 'O título do item não pode ser vazio.' })
  @IsString({ message: 'O título do item precisa ser uma string.' })
  titleItem: string;

  @IsNotEmpty({ message: 'O id da lista não pode ser vazio.' })
  @IsNumber()
  listId: number;
}
