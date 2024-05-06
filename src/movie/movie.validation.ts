import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export enum MoviePlatform {
  Netflix = 'netflix',
  Disney = 'disney',
}

export enum MovieGenre {
  Action = 'action',
  Comedy = 'comedy',
  Drama = 'drama',
  Fantasy = 'fantasy',
  Horror = 'horror',
  Mystery = 'mystery',
  Romance = 'romance',
  Thriller = 'thriller',
  Western = 'western',
}

const movieSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  genre: z.nativeEnum(MovieGenre),
  platform: z.nativeEnum(MoviePlatform),
});

export class MovieDto extends createZodDto(movieSchema) {}
