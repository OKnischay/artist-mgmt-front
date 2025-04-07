import { z } from "zod";
export const AlbumSchema = z.object({
  album_name: z.string().min(2, "Must be at least 2 characters.").nonempty("Title is required."),
  release_date: z.date(),
  total_tracks: z.coerce.number().int().min(1, "Must be at least 1 song.").optional(),
  artist: z.string()
});