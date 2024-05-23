import { optional, z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date))),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date))),
});

export const createPostSchema = z.object({
  heading: z.string(),
  description: z.string(),
  sendEmail: z.boolean(),
});

export const createPollSchema = z.object({
  heading: z.string(),
  description: z.string(),
  sendEmail: z.boolean(),
  allowMultiple: z.boolean(),
  options: z.array(z.string()),
});
