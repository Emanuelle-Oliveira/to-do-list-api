import { IsOptional, IsString } from 'class-validator';
import { IUpdateListPayload } from '../shared/iupdate-list.payload';

export class UpdateListDto implements IUpdateListPayload {
  @IsOptional()
  @IsString()
  titleList?: string;
}
