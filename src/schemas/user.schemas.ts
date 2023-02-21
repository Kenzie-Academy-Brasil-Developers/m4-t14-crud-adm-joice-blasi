import { hashSync } from 'bcryptjs';
import { z } from 'zod';

const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().min(5).max(120),
    password: z.string()
        .max(120)
        .regex(/(?=.*\d)/, { message: 'Must contain at least one digit' })
        .regex(/(?=.*[a-z])/, { message: 'Must contain at least one lowercase letter' })
        .regex(/(?=.*[A-Z])/, { message: 'Must contain at least one capital letter' })
        .regex(/(?=.*[$*&@#])/, { message: 'Must contain at least one special character' })
        .regex(/[0-9a-zA-Z$*&@#]{8,}/, { message: 'Must contain at least 8 of the characters mentioned' })
        .transform((pass) => hashSync(pass, 10)),
    admin: z.boolean().optional()
});

const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    active: z.boolean(),
});

const returnUserSchemaWithoutPassword = returnUserSchema.omit({ password: true });

const allUsersSchema = z.array(returnUserSchemaWithoutPassword);

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    allUsersSchema
};