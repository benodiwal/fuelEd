import { Prisma, EventFloorPlan } from '@prisma/client';
import { IDatabase } from 'interfaces';

export interface IEventFloorPlanModel {
  db: IDatabase;
  create(args: Prisma.EventFloorPlanCreateArgs): Promise<EventFloorPlan>;

  findFirst(args: Prisma.EventFloorPlanFindFirstArgs): Promise<EventFloorPlan | null>;

  findUnqiue(args: Prisma.EventFloorPlanFindUniqueArgs): Promise<EventFloorPlan | null>;

  findMany(args: Prisma.EventFloorPlanFindManyArgs): Promise<EventFloorPlan[]>;

  update(args: Prisma.EventFloorPlanUpdateArgs): Promise<EventFloorPlan>;

  updateMany(args: Prisma.EventFloorPlanUpdateManyArgs): Promise<Prisma.BatchPayload>;

  upsert(args: Prisma.EventFloorPlanUpsertArgs): Promise<EventFloorPlan>;

  delete(args: Prisma.EventFloorPlanDeleteArgs): Promise<EventFloorPlan>;

  deleteMany(args: Prisma.EventFloorPlanDeleteManyArgs): Promise<Prisma.BatchPayload>;
}
