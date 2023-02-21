import { QueryConfig } from 'pg';
import client from '../../database/config';
import { AppError } from '../../errors';
import { tUserResult, tUserWithoutPassword } from '../../interfaces/user.interfaces';
import { returnUserSchemaWithoutPassword } from '../../schemas/user.schemas';

const recoverUserService = async (idParam: number): Promise<tUserWithoutPassword> => {
    const queryStringAlreadyActive: string = `
        SELECT
            COUNT(*)
        FROM
            users
        WHERE
            id = $1
        AND
            active = true;
    `;
    const queryConfigAlreadyActive: QueryConfig = {
        text: queryStringAlreadyActive,
        values: [idParam]
    };
    const queryResultAlreadyActive = await client.query(queryConfigAlreadyActive);
    if (queryResultAlreadyActive.rows[0].count > 0) {
        throw new AppError('User already active');
    }

    const queryString: string = `
        UPDATE
            users
        SET
            active = true
        WHERE
            id = $1
        RETURNING *;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idParam]
    };
    const queryResult: tUserResult = await client.query(queryConfig);
    const user = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
    return user;
}

export default recoverUserService;