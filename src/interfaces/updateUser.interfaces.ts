import { QueryResult } from 'pg';
import { z } from 'zod';
import {
    updateUserSchema,
    returnUpdateSchema,
    returnUpdateUserWithoutPassword
} from '../schemas/update.schemas';

type tUpdateUserRequest = z.infer<typeof updateUserSchema>;

type tUpdate = z.infer<typeof returnUpdateSchema>;

type tUpdateWithoutPassword = z.infer<typeof returnUpdateUserWithoutPassword>;

type tUpdateResult = QueryResult<tUpdateWithoutPassword>;

export {
    tUpdateUserRequest,
    tUpdate,
    tUpdateWithoutPassword,
    tUpdateResult
};