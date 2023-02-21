import { Router } from 'express';
import {
    createUserController,
    readAllUsersController,
    readProfileController,
    recoverUserController,
    softDeleteUserController,
    updateUserController
} from '../controllers/users.controllers';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware';
import ensurePermissionAdminAndUserMiddleware from '../middlewares/ensurePermissionAdminAndUser.middleware';

const userRoutes: Router = Router();

userRoutes.post('', createUserController);

userRoutes.get('',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    readAllUsersController);

userRoutes.delete('/:id',
    ensureTokenIsValidMiddleware,
    ensurePermissionAdminAndUserMiddleware,
    ensureUserExistsMiddleware,
    softDeleteUserController);

userRoutes.get('/profile',
    ensureTokenIsValidMiddleware,
    readProfileController);

userRoutes.patch('/:id',
    ensureTokenIsValidMiddleware,
    ensurePermissionAdminAndUserMiddleware,
    ensureUserExistsMiddleware,
    updateUserController);

userRoutes.put('/:id/recover',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureUserExistsMiddleware,
    recoverUserController);

export default userRoutes;