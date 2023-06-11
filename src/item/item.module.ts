import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemRepositoryProvider } from './repositories/item.repository';
import { CreateItemUseCaseProvider } from './use-cases/create-item.use-case';
import { DeleteItemUseCaseProvider } from './use-cases/delete-item.use-case';
import { GetOneItemUseCaseProvider } from './use-cases/get-one-item.use-case';
import { UpdateItemUseCaseProvider } from './use-cases/update-item.use-case';

@Module({
  controllers: [ItemController],
  providers: [
    ItemRepositoryProvider,
    CreateItemUseCaseProvider,
    UpdateItemUseCaseProvider,
    GetOneItemUseCaseProvider,
    DeleteItemUseCaseProvider,
  ],
  exports: [
    ItemRepositoryProvider,
    CreateItemUseCaseProvider,
    UpdateItemUseCaseProvider,
    GetOneItemUseCaseProvider,
    DeleteItemUseCaseProvider,
  ],
})
export class ItemModule {}
