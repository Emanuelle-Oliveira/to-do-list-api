import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { ICreateListUseCase } from '../use-cases/contract/icreate-list.use-case';
import { ListEntity } from '../entities/list.entity';

@Controller('list')
export class ListController {
  constructor(private readonly createListUseCase: ICreateListUseCase) {}

  @Post()
  createList(@Body() dtoList: CreateListDto): Promise<ListEntity> {
    return this.createListUseCase.execute(dtoList);
  }
}
