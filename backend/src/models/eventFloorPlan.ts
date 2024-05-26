import { EventFloorPlan, Prisma } from '@prisma/client';
import { IDatabase } from 'interfaces';
import { IEventFloorPlanModel } from 'interfaces/models/eventFloorPlan.model';

export default class EventFloorPlanModel implements IEventFloorPlanModel {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async create(args: Prisma.EventFloorPlanCreateArgs): Promise<EventFloorPlan> {
    return this.db.client.eventFloorPlan.create(args);
  }

  async findFirst(args: Prisma.EventFloorPlanFindFirstArgs): Promise<EventFloorPlan | null> {
    return this.db.client.eventFloorPlan.findFirst(args);
  }

  async findUnqiue(args: Prisma.EventFloorPlanFindUniqueArgs): Promise<EventFloorPlan | null> {
    return this.db.client.eventFloorPlan.findUnique(args);
  }

  async findMany(args: Prisma.EventFloorPlanFindManyArgs): Promise<EventFloorPlan[]> {
    return this.db.client.eventFloorPlan.findMany(args);
  }

  async update(args: Prisma.EventFloorPlanUpdateArgs): Promise<EventFloorPlan> {
    return this.db.client.eventFloorPlan.update(args);
  }

  async updateMany(args: Prisma.EventFloorPlanUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventFloorPlan.updateMany(args);
  }

  async upsert(args: Prisma.EventFloorPlanUpsertArgs): Promise<EventFloorPlan> {
    return this.db.client.eventFloorPlan.upsert(args);
  }

  async delete(args: Prisma.EventFloorPlanDeleteArgs): Promise<EventFloorPlan> {
    return this.db.client.eventFloorPlan.delete(args);
  }

  async deleteMany(args: Prisma.EventFloorPlanDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.db.client.eventFloorPlan.deleteMany(args);
  }
}
