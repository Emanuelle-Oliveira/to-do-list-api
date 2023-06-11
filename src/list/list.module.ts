import { Module } from '@nestjs/common';
import { ListController } from './controllers/list.controller';
import { ListRepositoryProvider } from './repositories/list.repository';
import { CreateListUseCaseProvider } from './use-cases/create-list.use-case';
import { DeleteListUseCaseProvider } from './use-cases/delete-list.use-case';

@Module({
  controllers: [ListController],
  providers: [
    ListRepositoryProvider,
    CreateListUseCaseProvider,
    DeleteListUseCaseProvider,
  ],
  exports: [
    ListRepositoryProvider,
    CreateListUseCaseProvider,
    DeleteListUseCaseProvider,
  ],
})
export class ListModule {}
