import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemRepositoryProvider } from './repositories/item.repository';
import { CreateItemUseCaseProvider } from './use-cases/create-item.use-case';
import { DeleteItemUseCaseProvider } from './use-cases/delete-item.use-case';

@Module({
  controllers: [ItemController],
  providers: [
    ItemRepositoryProvider,
    CreateItemUseCaseProvider,
    DeleteItemUseCaseProvider,
  ],
  exports: [
    ItemRepositoryProvider,
    CreateItemUseCaseProvider,
    DeleteItemUseCaseProvider,
  ],
})
export class ItemModule {}
