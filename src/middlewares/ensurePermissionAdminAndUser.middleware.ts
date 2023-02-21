import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

const ensurePermissionAdminAndUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const idParam: number = parseInt(request.params.id);
    const authenticatedUser = request.user;
    if (!authenticatedUser.admin) {
        if (authenticatedUser.id !== idParam) {
            throw new AppError('Insufficient Permission', 403);
        }
    }
    return next();
}

export default ensurePermissionAdminAndUserMiddleware;