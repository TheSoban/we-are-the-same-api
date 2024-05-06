import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  itemsPerPage: z.coerce.number().min(0).default(36),
});

export class PaginationDto extends createZodDto(paginationSchema) {}
