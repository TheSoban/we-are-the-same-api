import { z } from 'zod';

export enum UserOpinion {
  Like = 'Like',
  Dislike = 'Dislike',
}

export const roomIdSchema = z.object({
  roomId: z.string().min(5).max(50),
});

export const preferenceWithoutUserIdSchema = roomIdSchema.extend({
  movieId: z.string().min(5).max(50),
  opinion: z.nativeEnum(UserOpinion),
});

export const preferenceSchema = preferenceWithoutUserIdSchema.extend({
  userId: z.string(),
});

export type RoomIdDto = z.infer<typeof roomIdSchema>;
export type PreferenceWithoutUserIdDto = z.infer<typeof preferenceWithoutUserIdSchema>;
export type PreferenceDto = z.infer<typeof preferenceSchema>;
