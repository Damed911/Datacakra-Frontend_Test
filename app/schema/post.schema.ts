import { z } from 'zod/v4'

export const article = z.object({
  title: z.string(),
  description: z.string(),
  cover_image_url: z.string(),
  category: z.number().optional(),
})

export const comment = z.object({
  content: z.string(),
  article: z.number(),
})

export const category = z.object({
  name: z.string(),
  description: z.string(),
})
