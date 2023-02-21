import { QueryResult } from 'pg';
import { z } from 'zod';
import {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword
} from '../schemas/user.schemas';

type tUserRequest = z.infer<typeof createUserSchema>;

type tUser = z.infer<typeof returnUserSchema>;

type tUserWithoutPassword = z.infer<typeof returnUserSchemaWithoutPassword>;

type tUserResult = QueryResult<tUserWithoutPassword>;

export {
    tUserRequest,
    tUser,
    tUserWithoutPassword,
    tUserResult
};