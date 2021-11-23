import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Helpers from '../helpers/Helpers';
import { IModels } from '../models';

class Middlewares {
  public helpers: Helpers;
  private models: IModels;

  constructor(helpers: Helpers, models: IModels) {
    this.helpers = helpers;
    this.models = models;
  }

  public verifyUserAlreadyExists = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { email } } = req;
    const userExists = await this.models.users.getUserByEmail(email);
    if (userExists) {
      return next({ status: 409, message: 'User already exists' });
    }
    return next();
  };

  public verifyUserInfos = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { name, email, password } } = req;
    const { error } = this.helpers.verifyUserInfosJoi({
      name,
      email,
      password,
    });
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

  public verifyUserExists = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const userExists = await this.models.users.getUserById(id);
    if (!userExists) {
      return next({
        status: 404,
        message: 'Dont exists a user with the specified id',
      });
    }
    return next();
  }

}

export default Middlewares;
