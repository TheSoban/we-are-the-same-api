import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  itemsPerPage: z.coerce.number().min(0).max(100).default(36),
});

export const idSchema = z.object({
  id: z.string(),
});

export type PaginationDto = z.infer<typeof paginationSchema>;
export type IdDto = z.infer<typeof idSchema>;
