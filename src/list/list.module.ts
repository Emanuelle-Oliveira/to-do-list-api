import { Module } from '@nestjs/common';
import { ListController } from './controllers/list.controller';
import { ListRepositoryProvider } from './repositories/list.repository';
import { CreateListUseCaseProvider } from './use-cases/create-list.use-case';

@Module({
  controllers: [ListController],
  providers: [ListRepositoryProvider, CreateListUseCaseProvider],
  exports: [ListRepositoryProvider, CreateListUseCaseProvider],
})
export class ListModule {}
