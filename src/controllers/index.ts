import UserController from './UserController';
import Helpers from '../helpers/Helpers';
import models from '../models';
import UserService from '../services/UserService';

export interface IControllers {
  users: UserController;
}

export default {
  users: new UserController(new Helpers(), models, UserService),
};
