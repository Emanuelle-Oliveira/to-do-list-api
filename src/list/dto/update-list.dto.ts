import { IsOptional, IsString } from 'class-validator';
import { IUpdateListPayload } from '../shared/iupdate-list.payload';

export class UpdateListDto implements IUpdateListPayload {
  @IsOptional()
  @IsString({ message: 'O título da lista precisa ser uma string.' })
  titleList?: string;
}
