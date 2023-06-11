export class ItemEntity {
  id: number;
  titleItem: string;
  description: string | null;
  startDate: Date | null;
  finalDate: Date | null;
  order: number;
  listId: number;

  constructor(payload: {
    id: number;
    titleItem: string;
    description: string | null;
    startDate: Date | null;
    finalDate: Date | null;
    order: number;
    listId: number;
  }) {
    this.id = payload.id;
    this.titleItem = payload.titleItem;
    this.description = payload.description;
    this.startDate = payload.startDate;
    this.finalDate = payload.finalDate;
    this.order = payload.order;
    this.listId = payload.listId;
  }
}
