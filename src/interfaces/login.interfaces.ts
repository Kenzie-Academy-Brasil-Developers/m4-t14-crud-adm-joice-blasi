import { z } from 'zod';
import loginSchema from '../schemas/login.schemas';

type tLoginRequest = z.infer<typeof loginSchema>;

export { tLoginRequest };