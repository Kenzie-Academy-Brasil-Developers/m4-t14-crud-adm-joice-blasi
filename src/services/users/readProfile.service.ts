import { Request } from 'express';
import { QueryConfig } from 'pg';
import client from '../../database/config';
import { tUserResult, tUserWithoutPassword } from '../../interfaces/user.interfaces';
import { returnUserSchemaWithoutPassword } from '../../schemas/user.schemas';

const readProfileService = async (request: Request): Promise<tUserWithoutPassword> => {
    const authenticatedUserId = request.user.id;
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [authenticatedUserId]
    };
    const queryResult: tUserResult = await client.query(queryConfig);
    const user = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
    return user;
}

export default readProfileService;