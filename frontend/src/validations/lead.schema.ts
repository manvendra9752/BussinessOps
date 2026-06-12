import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(8),
  company: z.string().min(2),
  source: z.string().min(1),
});
