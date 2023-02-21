import { QueryConfig } from 'pg';
import client from '../../database/config';

const deleteUserService = async (idParam: number): Promise<void> => {
    const queryString: string = `
        UPDATE
            users
        SET
            active = false
        WHERE
            id = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idParam]
    };
    await client.query(queryConfig);
}

export default deleteUserService;