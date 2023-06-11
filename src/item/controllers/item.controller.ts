import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateItemDto } from '../dto/create-item.dto';
import { ICreateItemUseCase } from '../use-cases/contract/icreate-item.use-case';
import { ItemEntity } from '../entities/item.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly createItemUseCase: ICreateItemUseCase) {}

  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<ItemEntity> {
    return this.createItemUseCase.execute(createItemDto);
  }
}
