import { Request, Response, NextFunction } from 'express';
import { QueryConfig } from 'pg';
import client from '../database/config';
import { AppError } from '../errors';

const ensureUserExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const idParam = parseInt(request.params.id);
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE id = $1
        LIMIT 1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idParam]
    }
    const queryResult = await client.query(queryConfig);
    if (queryResult.rowCount === 0) {
        throw new AppError('User not found.', 404);
    }
    return next();
}

export default ensureUserExistsMiddleware;