import { Injectable, Provider } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IItemRepository } from './contract/iitem.repository';
import { ICreateItemPayload } from '../shared/icreate-item-payload';
import { Item } from '@prisma/client';
import { ItemEntity } from '../entities/item.entity';
import { IUpdateItemPayload } from '../shared/iupdate-item.payload';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ICreateItemPayload): Promise<ItemEntity> {
    const item = await this.prisma.item.create({
      data: dto,
    });
    return this.BuildEntity(item);
  }

  async update(id: number, dto: IUpdateItemPayload): Promise<ItemEntity> {
    const updatedItem = await this.prisma.item.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return this.BuildEntity(updatedItem);
  }

  async getOne(id: number): Promise<ItemEntity> {
    const item = await this.prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    return this.BuildEntity(item);
  }

  async delete(id: number): Promise<ItemEntity> {
    const item = await this.prisma.item.delete({
      where: {
        id: id,
      },
    });
    return this.BuildEntity(item);
  }

  private BuildEntity(payload: Item): ItemEntity {
    return new ItemEntity({
      id: payload.id,
      titleItem: payload.titleItem,
      description: payload.description,
      startDate: payload.startDate,
      finalDate: payload.finalDate,
      order: payload.order,
      listId: payload.listId,
    });
  }
}

export const ItemRepositoryProvider: Provider<IItemRepository> = {
  provide: IItemRepository,
  useClass: ItemRepository,
};
