import { z } from 'zod/v4'

export const Login = z
  .object({
    identifier: z.email(),
    password: z.string(),
  })
  .required()
