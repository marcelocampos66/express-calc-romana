import UserModel from './UserModel';

export interface IModels {
  users: UserModel;
}

export default {
  users: new UserModel(),
};
