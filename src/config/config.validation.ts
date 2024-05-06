import { z } from 'zod';
import { Environments } from './config.types';

const numberRegex = /^\d+$/;

export const configSchema = z
  .object({
    // General
    NODE_ENV: z.nativeEnum(Environments),
    API_PORT: z.string().regex(numberRegex).optional(),
    // Firebase
    PROJECT_ID: z.string().min(1),
    PRIVATE_KEY: z.string().min(1),
    CLIENT_EMAIL: z.string().min(1),
  })
  .strip();
