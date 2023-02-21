import { QueryConfig } from 'pg';
import { tLoginRequest } from '../../interfaces/login.interfaces';
import client from '../../database/config';
import { AppError } from '../../errors';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import loginSchema from '../../schemas/login.schemas';
import 'dotenv/config';

const loginService = async (loginData: tLoginRequest): Promise<string> => {
    const validateLoginData = loginSchema.parse(loginData);
    const queryStringEmailExists: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;
    const queryConfigEmailExists: QueryConfig = {
        text: queryStringEmailExists,
        values: [validateLoginData.email]
    };
    const queryResultEmailExists = await client.query(queryConfigEmailExists);
    if (queryResultEmailExists.rowCount === 0) {
        throw new AppError('Wrong email/password', 401);
    }
    if (!queryResultEmailExists.rows[0].active) {
        throw new AppError('Disabled user', 401);
    }
    const validPassword: boolean = await compare(loginData.password, queryResultEmailExists.rows[0].password);
    if (!validPassword) {
        throw new AppError('Wrong email/password', 401);
    }
    const token: string = jwt.sign(
        {
            admin: queryResultEmailExists.rows[0].admin,
            id: queryResultEmailExists.rows[0].id
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: queryResultEmailExists.rows[0].id.toString()
        })
    return token;
}

export default loginService;