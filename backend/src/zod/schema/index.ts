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

export const addEventSchema = z.object({
  summary: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
});

export const createVenueSchema = z.object({
  name: z.string(),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  state: z.string(),
});
