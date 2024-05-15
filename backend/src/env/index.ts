import { z } from 'zod';
import { config } from 'dotenv';

const envSchema = z.object({
  PORT: z.string(),
  JWT_SIGNING_KEY: z.string(),
  JWT_EXPIRY: z.string(),
  DATABASE_URL: z.string(),
});

export const parseEnv = (): void => {
  config();
  envSchema.parse(process.env);
};

const getEnvVar = (key: keyof z.infer<typeof envSchema>): string => {
  return process.env[key] as string;
};

export default getEnvVar;
