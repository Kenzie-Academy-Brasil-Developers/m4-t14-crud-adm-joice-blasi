import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

const ensureIsAdminMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const authenticatedUser = request.user;
    if (!authenticatedUser.admin) {
        throw new AppError('Insufficient Permission', 403);
    }
    return next();
}

export default ensureIsAdminMiddleware;