import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemRepositoryProvider } from './repositories/item.repository';
import { CreateItemUseCaseProvider } from './use-cases/create-item.use-case';

@Module({
  controllers: [ItemController],
  providers: [ItemRepositoryProvider, CreateItemUseCaseProvider],
  exports: [ItemRepositoryProvider, CreateItemUseCaseProvider],
})
export class ItemModule {}
