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
  avatar: z.object({
    url: z.string().optional(),
  }),
});

export const EditUserZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  age: z
    .string()
    .transform((data: unknown) => Number(data))
    .optional(),
  profession: z.string().optional(),
  location: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
  }),
  avatar: z.object({
    url: z.string().optional(),
  }),
});
