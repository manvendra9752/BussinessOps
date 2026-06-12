const { z } = require("zod");

const createLeadSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(8),

  company: z.string().min(2),

  source: z.string(),
});

module.exports = {
  createLeadSchema,
};
