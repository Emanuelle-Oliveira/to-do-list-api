import { IListRepository } from './contract/ilist.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { ICreateListPayload } from '../shared/icreate-list-payload';
import { Injectable, Provider } from '@nestjs/common';
import { Item, List } from '@prisma/client';
import { ListEntity } from '../entities/list.entity';
import { ItemEntity } from '../../item/entities/item.entity';

@Injectable()
export class ListRepository implements IListRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ICreateListPayload): Promise<ListEntity> {
    const list = await this.prisma.list.create({
      data: dto,
    });
    return this.BuildEntity(list);
  }

  private BuildEntity(payload: List & { items?: Item[] }): ListEntity {
    let list = new ListEntity({
      id: payload.id,
      titleList: payload.titleList,
      order: payload.order,
    });

    if (payload.items) {
      list = list.setItems(payload.items.map((i) => new ItemEntity(i)));
    }

    return list;
  }
}

export const ListRepositoryProvider: Provider<IListRepository> = {
  provide: IListRepository,
  useClass: ListRepository,
};
