import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import Helpers from '../helpers/Helpers';
import { IModels } from '../models';
import { UserService } from '../services/UserService';

class UserController extends Middlewares {
  public router: express.Router;
  private service: UserService;

  constructor(helpers: Helpers, models: IModels, service: UserService) {
    super(helpers, models);
    this.router = express.Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [
      this.verifyUserAlreadyExists,
      this.verifyUserInfos,
      this.registerUser,
    ]);
    this.router.post('/login', [
      this.login,
    ]);
    this.router.get('/', [
      this.getAllUsers,
    ]);
    this.router.get('/:id', [
      this.verifyUserExists,
      this.getUserById,
    ]);
    this.router.put('/:id', [
      this.verifyUserExists,
      this.updateUser,
    ]);
    this.router.delete('/:id', [
      this.verifyUserExists,
      this.deleteUser,
    ]);
  }

  private registerUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { name, email, password } } = req;
    const result = await this.service.registerUser({ name, email, password });
    return res.status(201).json(result);
  }

  private login = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { email, password } } = req;
    return res.status(200).json();
  }

  private getAllUsers = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const users = await this.service.getAllUsers();
    return res.status(200).json(users);
  }

  private getUserById = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.getUserById(id);
    return res.status(200).json(result);
  }

  private updateUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { params: { id }, body: { name, email, password } } = req;
    const result = await this.service.updateUser(id, { name, email, password });
    return res.status(200).json(result);
  }

  private deleteUser = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.deleteUser(id);
    return res.status(200).json(result);
  }

};

export default UserController;
