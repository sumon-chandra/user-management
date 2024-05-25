import { z } from "zod";
export const AddUserZodSchema = z.object({
  name: z.string({ required_error: "Name is not set!" }),
  email: z.string({ required_error: "Email is not set!" }).email(),
  age: z
    .string({ required_error: "Age is not set!" })
    .transform((data: unknown) => Number(data)),
  profession: z.string({ required_error: "Profession is not set!" }),
  location: z.object({
    city: z.string({ required_error: "City is not set!" }),
    country: z.string({ required_error: "Country is not set!" }),
  }),
});
