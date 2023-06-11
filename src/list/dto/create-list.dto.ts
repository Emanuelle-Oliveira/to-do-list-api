import { ICreateListPayload } from '../shared/icreate-list-payload';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto implements ICreateListPayload {
  @IsNotEmpty()
  @IsString()
  titleList: string;
}
