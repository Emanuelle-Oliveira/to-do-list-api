import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { ICreateListUseCase } from '../use-cases/contract/icreate-list.use-case';
import { ListEntity } from '../entities/list.entity';
import { IDeleteListUseCase } from '../use-cases/contract/idelete-list.use-case';

@Controller('list')
export class ListController {
  constructor(
    private readonly createListUseCase: ICreateListUseCase,
    private readonly deleteListUseCase: IDeleteListUseCase,
  ) {}

  @Post()
  createList(@Body() dtoList: CreateListDto): Promise<ListEntity> {
    return this.createListUseCase.execute(dtoList);
  }

  @Delete('/:id')
  deleteList(@Param('id', ParseIntPipe) id: number) {
    return this.deleteListUseCase.execute(id);
  }
}
