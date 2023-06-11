import { IUpdateItemPayload } from '../shared/iupdate-item.payload';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateItemDto implements IUpdateItemPayload {
  @IsString()
  @IsOptional()
  titleItem?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsOptional()
  @IsDate()
  finalDate?: Date;
}
