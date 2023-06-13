import { IListRepository } from './contract/ilist.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { ICreateListPayload } from '../shared/icreate-list-payload';
import { Injectable, Provider } from '@nestjs/common';
import { Item, List } from '@prisma/client';
import { ListEntity } from '../entities/list.entity';
import { IUpdateListPayload } from '../shared/iupdate-list.payload';
import { ItemEntity } from '../../item/entities/item.entity';

@Injectable()
export class ListRepository implements IListRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ICreateListPayload, order: number): Promise<ListEntity> {
    const list = await this.prisma.list.create({
      data: {
        titleList: dto.titleList,
        order: order,
      },
    });
    return this.BuildEntity(list);
  }

  async count(): Promise<number> {
    return this.prisma.list.count();
  }

  async update(id: number, dto: IUpdateListPayload): Promise<ListEntity> {
    const updatedList = await this.prisma.list.update({
      where: {
        id: id,
      },
      data: dto,
    });

    return this.BuildEntity(updatedList);
  }

  async updateOrder(id: number, order: number): Promise<ListEntity> {
    const updatedList = await this.prisma.list.update({
      where: {
        id: id,
      },
      data: {
        order: order,
      },
    });
    return this.BuildEntity(updatedList);
  }

  async getAll(): Promise<ListEntity[]> {
    const lists = await this.prisma.list.findMany({
      include: {
        items: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return lists.map((list) => this.BuildEntity(list));
  }

  async getOne(id: number): Promise<ListEntity> {
    const list = await this.prisma.list.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (list) return this.BuildEntity(list);
  }

  async delete(id: number): Promise<ListEntity> {
    const deletedList = await this.prisma.list.delete({
      where: {
        id: id,
      },
    });

    return this.BuildEntity(deletedList);
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
