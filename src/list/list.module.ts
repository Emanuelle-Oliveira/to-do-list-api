import { Module } from '@nestjs/common';
import { ListController } from './controllers/list.controller';
import { ListRepositoryProvider } from './repositories/list.repository';
import { CreateListUseCaseProvider } from './use-cases/create-list.use-case';
import { DeleteListUseCaseProvider } from './use-cases/delete-list.use-case';
import { GetAllListUseCaseProvider } from './use-cases/get-all-list.use-case';
import { GetOneListUseCaseProvider } from './use-cases/get-one-list.use-case';
import { UpdateListUseCaseProvider } from './use-cases/update-list.use-case';
import { UpdateOrderListUseCaseProvider } from './use-cases/update-order-list.use-case';

@Module({
  controllers: [ListController],
  providers: [
    ListRepositoryProvider,
    CreateListUseCaseProvider,
    UpdateListUseCaseProvider,
    UpdateOrderListUseCaseProvider,
    GetAllListUseCaseProvider,
    GetOneListUseCaseProvider,
    DeleteListUseCaseProvider,
  ],
  exports: [
    ListRepositoryProvider,
    CreateListUseCaseProvider,
    UpdateListUseCaseProvider,
    UpdateOrderListUseCaseProvider,
    GetAllListUseCaseProvider,
    GetOneListUseCaseProvider,
    DeleteListUseCaseProvider,
  ],
})
export class ListModule {}
