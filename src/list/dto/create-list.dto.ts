import { ICreateListPayload } from '../shared/icreate-list-payload';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto implements ICreateListPayload {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'O título da lista não pode ser vazio.' })
  @IsString({ message: 'O título da lista precisa ser uma string.' })
  titleList: string;
}
