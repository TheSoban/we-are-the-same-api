import { z } from 'zod';

export enum MoviePlatform {
  Netflix = 'Netflix',
  Disney = 'Disney',
}

export enum MovieGenre {
  Horror = 'Horror',
  Supernatural = 'Supernatural',
  Action = 'Action',
  ScienceFiction = 'ScienceFiction',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Crime = 'Crime',
  Mystery = 'Mystery',
  Thriller = 'Thriller',
  Adventure = 'Adventure',
  Fantasy = 'Fantasy',
  War = 'War',
  Superhero = 'Superhero',
  Family = 'Family',
  Teen = 'Teen',
  Romance = 'Romance',
  Spy = 'Spy',
  Historical = 'Historical',
  Political = 'Political',
  Animated = 'Animated',
  Sports = 'Sports',
  Musical = 'Musical',
  Biography = 'Biography',
  Noir = 'Noir',
  Dance = 'Dance',
  Documentary = 'Documentary',
  LiveAction = 'LiveAction',
  Erotic = 'Erotic',
  Legal = 'Legal',
  Short = 'Short',
  Satire = 'Satire',
  Western = 'Western',
  Slasher = 'Slasher',
  MartialArts = 'MartialArts',
  Performance = 'Performance',
  Independent = 'Independent',
  Disaster = 'Disaster',
  FoundFootage = 'FoundFootage',
}

export const movieSchema = z.object({
  title: z.string().min(1),
  year: z.number().min(1800).max(2100),
  description: z.string().min(1),
  thumbnailUrl: z.string().url(),
  genres: z.nativeEnum(MovieGenre).array(),
  platform: z.nativeEnum(MoviePlatform),
});

export type MovieDto = z.infer<typeof movieSchema>;
