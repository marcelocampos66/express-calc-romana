import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import Helpers from '../helpers/Helpers';
import { IModels } from '../models';

class Middlewares {
  private helpers: Helpers;
  private models: IModels;
  private secret: jwt.Secret;

  constructor(helpers: Helpers, models: IModels) {
    this.helpers = helpers;
    this.models = models;
    this.secret = process.env.JWT_SECRET as jwt.Secret;
  }

  public validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { headers: { authorization } } = req;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const payload = jwt.verify(authorization, this.secret);
      if (!payload) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
      req.payload = payload;
      return next();
    } catch (e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };

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

  public verifyUserId = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    if (!ObjectId.isValid(id)) {
      return next({
        status: 400,
        message: 'Invalid Id',
      });
    }
    const userExists = await this.models.users.getUserById(id);
    if (!userExists) {
      return next({
        status: 404,
        message: 'Dont exists a user with the specified id',
      });
    }
    return next();
  }

  public verifyLoginCredentials = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { email, password } } = req;
    const { error } = this.helpers.verifyLoginCredentialsJoi({ email, password });
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

}

export default Middlewares;
