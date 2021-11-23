import models, { IModels } from '../models';
import Helpers from "../helpers/Helpers";

export class UserService {
  private models: IModels;
  private helpers: Helpers;

  constructor(models: IModels, helpers: Helpers) {
    this.models = models;
    this.helpers = helpers;
  }

  public async registerUser(user: IUser) {
    const { password, ...others } = user;
    const newUser: IUser = {
      ...others,
      password: this.helpers.hashPassword(password),
    };
    const insertedId = await this.models.users.register(newUser)
    return this.models.users.getUserById(insertedId.toString());
  }

  public async getAllUsers() {
    return this.models.users.getAllUsers();
  }

  public async getUserById(id: string) {
    return this.models.users.getUserById(id);
  }

  public async updateUser(id: string, newInfos: IUser) {
    const { password, ...othersInfos } = newInfos;
    const newInfosWithHashedPassword: IUser = {
      ...othersInfos,
      password: this.helpers.hashPassword(password),
    };
    await this.models.users.updateUser(id, newInfosWithHashedPassword);
    return this.models.users.getUserById(id);
  }

  public async deleteUser(id: string) {
    await this.models.users.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

}

export default new UserService(models, new Helpers());
