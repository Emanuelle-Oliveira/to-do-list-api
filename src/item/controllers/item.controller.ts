import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from '../dto/create-item.dto';
import { ICreateItemUseCase } from '../use-cases/contract/icreate-item.use-case';
import { ItemEntity } from '../entities/item.entity';
import { IDeleteItemUseCase } from '../use-cases/contract/idelete-item.use-case';
import { IGetOneItemUseCase } from '../use-cases/contract/iget-one-item.use-case';

@Controller('item')
export class ItemController {
  constructor(
    private readonly createItemUseCase: ICreateItemUseCase,
    private readonly getOneItemUseCase: IGetOneItemUseCase,
    private readonly deleteItemUseCase: IDeleteItemUseCase,
  ) {}

  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<ItemEntity> {
    return this.createItemUseCase.execute(createItemDto);
  }

  @Get('/:id')
  getOneItem(@Param('id', ParseIntPipe) id: number) {
    return this.getOneItemUseCase.execute(id);
  }

  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.deleteItemUseCase.execute(id);
  }
}
