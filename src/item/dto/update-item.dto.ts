import { IUpdateItemPayload } from '../shared/iupdate-item.payload';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto implements IUpdateItemPayload {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O título do item precisa ser uma string.' })
  titleItem?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A descrição do item precisa ser uma string.' })
  description?: string;

  @ApiPropertyOptional({
    type: Date,
  })
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsOptional()
  @IsDate({ message: 'A data de início precisa ser uma data válida.' })
  startDate?: Date;

  @ApiPropertyOptional({
    type: Date,
  })
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsOptional()
  @IsDate({ message: 'A data final precisa ser uma data válida.' })
  finalDate?: Date;
}
