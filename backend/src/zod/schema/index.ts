import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date))),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date))),
});
