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
import { IGetAllListUseCase } from '../use-cases/contract/iget-all-list.use-case';
import { IGetOneListUseCase } from '../use-cases/contract/iget-one-list.use-case';

@Controller('list')
export class ListController {
  constructor(
    private readonly createListUseCase: ICreateListUseCase,
    private readonly getAllListUseCase: IGetAllListUseCase,
    private readonly getOneListUseCase: IGetOneListUseCase,
    private readonly deleteListUseCase: IDeleteListUseCase,
  ) {}

  @Post()
  createList(@Body() dtoList: CreateListDto): Promise<ListEntity> {
    return this.createListUseCase.execute(dtoList);
  }

  @Get()
  getAllLists(): Promise<ListEntity[]> {
    return this.getAllListUseCase.execute();
  }

  @Get('/:id')
  getOneList(@Param('id', ParseIntPipe) id: number) {
    return this.getOneListUseCase.execute(id);
  }

  @Delete('/:id')
  deleteList(@Param('id', ParseIntPipe) id: number) {
    return this.deleteListUseCase.execute(id);
  }
}
