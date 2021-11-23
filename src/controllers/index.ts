import UserController from './UserController';
import CalculatorController from './CalculatorController';
import Helpers from '../helpers/Helpers';
import models from '../models';
import UserService from '../services/UserService';
import CalculatorService from '../services/CalculatorService';

export interface IControllers {
  users: UserController;
  calculator: CalculatorController;
}

export default {
  users: new UserController(new Helpers(), models, UserService),
  calculator: new CalculatorController(new Helpers(), models, CalculatorService),
};
