import { z } from 'zod/v4'

export const article = z.object({
  title: z.string().min(1, { error: "Title can't empty" }),
  description: z.string().min(1, { error: "Description can't empty" }),
  cover_image_url: z.string(),
  category: z.number().optional(),
})

export const comment = z.object({
  content: z.string().min(1, { error: "Comment can't empty" }),
  article: z.number().optional(),
})

export const category = z.object({
  name: z.string().min(1, { error: "Category name can't empty" }),
  description: z.string().min(1, { error: "Category description can't empty" }),
})
