import { z } from 'zod/v4'

export const Login = z
  .object({
    identifier: z.email("Input isn't an email or empty"),
    password: z.string().min(8, { error: "Password don't have 8 characters" }),
  })
  .required()
