import { Request, Response } from 'express';
import createUserService from '../services/users/createUser.service';
import readAllUsersService from '../services/users/readUsers.service';
import deleteUserService from '../services/users/deleteUser.service';
import readProfileService from '../services/users/readProfile.service';
import updateUserService from '../services/users/updateUser.service';
import recoverUserService from '../services/users/recoverUser.service';
import { tUserRequest } from '../interfaces/user.interfaces';
import { tUpdateUserRequest } from '../interfaces/updateUser.interfaces';

const createUserController = async (request: Request, response: Response): Promise<Response> => {
    const userData: tUserRequest = request.body;
    const newUser = await createUserService(userData);
    return response.status(201).json(newUser);
}

const readAllUsersController = async (request: Request, response: Response): Promise<Response> => {
    const allUsers = await readAllUsersService();
    return response.json(allUsers);
}

const softDeleteUserController = async (request: Request, response: Response): Promise<Response> => {
    const idParam: number = parseInt(request.params.id);
    await deleteUserService(idParam);
    return response.status(204).send();
}

const readProfileController = async (request: Request, response: Response): Promise<Response> => {
    const user = await readProfileService(request);
    return response.json(user);
}

const updateUserController = async (request: Request, response: Response): Promise<Response> => {
    const idParam: number = parseInt(request.params.id);
    const updateData: tUpdateUserRequest = request.body;
    const updateUser = await updateUserService(idParam, updateData);
    return response.json(updateUser);
}

const recoverUserController = async (request: Request, response: Response): Promise<Response> => {
    const idParam: number = parseInt(request.params.id);
    const recoverUser = await recoverUserService(idParam);
    return response.json(recoverUser);
}

export {
    createUserController,
    readAllUsersController,
    softDeleteUserController,
    readProfileController,
    updateUserController,
    recoverUserController
};