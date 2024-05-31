import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
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

export const updatePollOptionSchema = z.object({
  pollOptionId: z.string(),
});
