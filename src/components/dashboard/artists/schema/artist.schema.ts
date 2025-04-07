import { z } from "zod";
export const ArtistSchema = z.object({
  email: z.string().email("Invalid email.").min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Must contain at least one letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    // .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character.")
    .trim(),
  stage_name: z.string().min(2, "Must be at least 2 characters.").nonempty("Name is required."),
  first_name: z.string().optional().default(""),
  last_name: z.string().optional().default(""),
  first_release_year: z.coerce.number().int().min(1950, "Year must be at least 1950."),
  no_of_albums_released: z.coerce.number().int().min(1, "Must be at least 1 album."),
  date_of_birth: z.date().optional(),
  gender: z.enum(["M", "F", "O"], { required_error: "Gender is required." }),
  address: z.string().optional().default(""),
});