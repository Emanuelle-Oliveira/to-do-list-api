import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { ICreateListUseCase } from '../use-cases/contract/icreate-list.use-case';
import { ListEntity } from '../entities/list.entity';
import { IDeleteListUseCase } from '../use-cases/contract/idelete-list.use-case';
import { IGetAllListUseCase } from '../use-cases/contract/iget-all-list.use-case';
import { IGetOneListUseCase } from '../use-cases/contract/iget-one-list.use-case';
import { IUpdateListUseCase } from '../use-cases/contract/iupdate-list.use-case';
import { UpdateListDto } from '../dto/update-list.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateOrderListDto } from '../dto/update-order-list.dto';
import { IUpdateOrderListUseCase } from '../use-cases/contract/iupdate-order-list.use-case';

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(
    private readonly createListUseCase: ICreateListUseCase,
    private readonly updateListUseCase: IUpdateListUseCase,
    private readonly updateOrderListUseCase: IUpdateOrderListUseCase,
    private readonly getAllListUseCase: IGetAllListUseCase,
    private readonly getOneListUseCase: IGetOneListUseCase,
    private readonly deleteListUseCase: IDeleteListUseCase,
  ) {}

  @ApiBody({
    type: CreateListDto,
  })
  @ApiResponse({
    status: 201,
    description: 'List has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid list title.',
  })
  @ApiOperation({ summary: 'Create list' })
  @Post()
  createList(@Body() dtoList: CreateListDto): Promise<ListEntity> {
    return this.createListUseCase.execute(dtoList);
  }

  @ApiBody({
    type: UpdateListDto,
  })
  @ApiResponse({
    status: 200,
    description: 'List has been successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid list title.',
  })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @ApiOperation({ summary: 'Update list' })
  @Patch('/:id')
  updateList(
    @Param('id') id: number,
    @Body() dto: UpdateListDto,
  ): Promise<ListEntity> {
    return this.updateListUseCase.execute(id, dto);
  }

  @ApiBody({
    type: UpdateOrderListDto,
  })
  @ApiResponse({
    status: 200,
    description: 'List has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @ApiOperation({ summary: 'Update list order.' })
  @Patch('/order/:id')
  updateOrderList(
    @Param('id') id: number,
    @Body() updateOrderListDto: UpdateOrderListDto,
  ): Promise<ListEntity> {
    return this.updateOrderListUseCase.execute(id, updateOrderListDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Lists were returned successfully.',
  })
  @ApiOperation({ summary: 'Get all lists' })
  @Get()
  getAllLists(): Promise<ListEntity[]> {
    return this.getAllListUseCase.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'List was returned successfully.',
  })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @ApiOperation({ summary: 'Get a list' })
  @Get('/:id')
  getOneList(@Param('id', ParseIntPipe) id: number): Promise<ListEntity> {
    return this.getOneListUseCase.execute(id);
  }

  @ApiResponse({
    status: 200,
    description: 'List was deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'List not found.' })
  @ApiOperation({ summary: 'Delete list' })
  @Delete('/:id')
  deleteList(@Param('id', ParseIntPipe) id: number): Promise<ListEntity> {
    return this.deleteListUseCase.execute(id);
  }
}
