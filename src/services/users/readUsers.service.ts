import { tUserResult, tUserWithoutPassword } from '../../interfaces/user.interfaces';
import client from '../../database/config'
import { allUsersSchema } from '../../schemas/user.schemas';

const readAllUsersService = async (): Promise<tUserWithoutPassword[]> => {
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            active = true;
    `;
    const queryResult: tUserResult = await client.query(queryString);
    const users = allUsersSchema.parse(queryResult.rows);
    return users;
}

export default readAllUsersService;