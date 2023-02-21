import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import client from '../../database/config';
import { returnUpdateUserWithoutPassword, updateUserSchema } from '../../schemas/update.schemas';
import { tUpdateResult, tUpdateWithoutPassword, tUpdateUserRequest } from '../../interfaces/updateUser.interfaces';
import { AppError } from '../../errors';

const updateUserService = async (idParam: number, updateData: tUpdateUserRequest): Promise<tUpdateWithoutPassword> => {
    const validatedUpdateData = updateUserSchema.parse(updateData);
    if (validatedUpdateData.email) {
        const queryString: string = `
            SELECT
                COUNT(*)
            FROM
                users
            WHERE
                email = $1
            LIMIT 1;
        `;
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [validatedUpdateData.email]
        };
        const queryResult: QueryResult = await client.query(queryConfig);
        if (queryResult.rows[0].count > 0) {
            throw new AppError('E-mail already registered', 409);
        }
    }
    const queryString: string = format(
        `
            UPDATE
                users
            SET (%I) = ROW (%L)
            WHERE
                id = $1
            RETURNING *;
        `,
        Object.keys(validatedUpdateData),
        Object.values(validatedUpdateData)
    );
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idParam]
    };
    const queryResult: tUpdateResult = await client.query(queryConfig);
    const updateUser = returnUpdateUserWithoutPassword.parse(queryResult.rows[0]);
    return updateUser;
}

export default updateUserService;