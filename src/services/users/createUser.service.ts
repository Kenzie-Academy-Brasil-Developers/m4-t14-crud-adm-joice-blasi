import { tUserRequest, tUserResult, tUserWithoutPassword } from '../../interfaces/user.interfaces';
import client from '../../database/config';
import format from 'pg-format';
import { QueryConfig } from 'pg';
import { AppError } from '../../errors';
import { createUserSchema, returnUserSchemaWithoutPassword } from '../../schemas/user.schemas';

const createUserService = async (userData: tUserRequest): Promise<tUserWithoutPassword> => {
    const validatedUserData = createUserSchema.parse(userData);
    const queryStringEmailExists: string = `
        SELECT *
        FROM users
        WHERE email = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryStringEmailExists,
        values: [validatedUserData.email]
    }
    const queryResultEmailExists = await client.query(queryConfig);
    if (queryResultEmailExists.rowCount > 0) {
        throw new AppError('E-mail already registered', 409);
    }

    const queryString: string = format(
        `
            INSERT INTO
                users (%I)
            VALUES (%L)
            RETURNING *;
        `,
        Object.keys(validatedUserData),
        Object.values(validatedUserData)
    );
    const queryResult: tUserResult = await client.query(queryString);
    const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
    return newUser;
}

export default createUserService;