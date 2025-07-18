import { z } from "zod";

const commonAuth = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export const loginSchema = commonAuth;

export const registerSchema = commonAuth
  .extend({
    name: z
      .string()
      .min(4, "Mimum 4 characters")
      .max(50, "Maximum 50 characters"),
    repeatPassword: z.string().min(6, "Minimum 6 characters"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export const createPostSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Content is required"),
    images: z
      .array(
        z.object({
          uri: z.string(),
          name: z.string(),
          type: z.string(),
        })
      )
      .min(1, "At least one image is required!"),
    category_id: z.number().min(1, "Select category"),
    subcategory_id: z.number().min(1, "Sub category is required"),
    trade: z.boolean(),
    price: z.string().optional(),
  })
  .refine(
    (data) =>
      data.trade ||
      (data.price &&
        !isNaN(parseFloat(data.price)) &&
        parseFloat(data.price) > 0),
    {
      message: "Price must be a number greater than 0 when not trading",
      path: ["price"],
    }
  );
