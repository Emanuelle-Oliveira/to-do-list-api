import { IsOptional, IsString } from 'class-validator';
import { IUpdateListPayload } from '../shared/iupdate-list.payload';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateListDto implements IUpdateListPayload {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O título da lista precisa ser uma string.' })
  titleList?: string;
}
