import { ItemEntity } from '../../item/entities/item.entity';

export class ListEntity {
  id: number;
  titleList: string;
  order: number;
  items?: ItemEntity[] | null;

  constructor(payload: { id: number; titleList: string; order: number }) {
    this.id = payload.id;
    this.titleList = payload.titleList;
    this.order = payload.order;
  }

  setItems(items: ItemEntity[]) {
    this.items = items;
    return this;
  }
}
