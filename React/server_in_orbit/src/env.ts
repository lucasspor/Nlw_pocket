import z from 'zod'

const envsSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const env = envsSchema.parse(process.env)
