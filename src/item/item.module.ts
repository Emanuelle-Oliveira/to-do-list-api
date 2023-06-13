import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemRepositoryProvider } from './repositories/item.repository';
import { CreateItemUseCaseProvider } from './use-cases/create-item.use-case';
import { DeleteItemUseCaseProvider } from './use-cases/delete-item.use-case';
import { GetOneItemUseCaseProvider } from './use-cases/get-one-item.use-case';
import { UpdateItemUseCaseProvider } from './use-cases/update-item.use-case';
import { UpdateOrderItemUseCaseProvider } from './use-cases/update-order-item.use-case';
import { ListRepositoryProvider } from '../list/repositories/list.repository';

@Module({
  controllers: [ItemController],
  providers: [
    ItemRepositoryProvider,
    ListRepositoryProvider,
    CreateItemUseCaseProvider,
    UpdateItemUseCaseProvider,
    UpdateOrderItemUseCaseProvider,
    GetOneItemUseCaseProvider,
    DeleteItemUseCaseProvider,
  ],
  exports: [
    ItemRepositoryProvider,
    CreateItemUseCaseProvider,
    UpdateItemUseCaseProvider,
    UpdateOrderItemUseCaseProvider,
    GetOneItemUseCaseProvider,
    DeleteItemUseCaseProvider,
  ],
})
export class ItemModule {}
