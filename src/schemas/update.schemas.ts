import { hashSync } from 'bcryptjs';
import { z } from 'zod';

const updateUserSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().min(5).max(120).optional(),
    password: z.string()
        .max(120)
        .regex(/(?=.*\d)/, { message: 'Must contain at least one digit' })
        .regex(/(?=.*[a-z])/, { message: 'Must contain at least one lowercase letter' })
        .regex(/(?=.*[A-Z])/, { message: 'Must contain at least one capital letter' })
        .regex(/(?=.*[$*&@#])/, { message: 'Must contain at least one special character' })
        .regex(/[0-9a-zA-Z$*&@#]{8,}/, { message: 'Must contain at least 8 of the characters mentioned' })
        .transform((pass) => hashSync(pass, 10))
        .optional()
});

const returnUpdateSchema = updateUserSchema.extend({
    admin: z.boolean(),
    id: z.number(),
    active: z.boolean()
});

const returnUpdateUserWithoutPassword = returnUpdateSchema.omit({ password: true });

export {
    updateUserSchema,
    returnUpdateSchema,
    returnUpdateUserWithoutPassword
};