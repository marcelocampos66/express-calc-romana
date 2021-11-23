import Connection from "./Connection";
import { ObjectId } from 'mongodb';

class UserModel extends Connection {
  constructor() {
    super();
  }

  public async register(newUser: IUser) {
    return this.connection()
      .then((db) => db.collection('users').insertOne(newUser))
      .then(({ insertedId }) => insertedId)
  }

  public async getUserByEmail(email: string) {
    return this.connection()
      .then((db) => db.collection('users').findOne({ email }));
  }

  public async getAllUsers() {
    return this.connection()
      .then((db) => db.collection('users').find().toArray());
  }

  public async getUserById(id: string) {
    return this.connection()
      .then((db) => db.collection('users').findOne({ _id: new ObjectId(id) }));
  }

  public async updateUser(id: string, newInfos: IUser) {
    return this.connection()
      .then((db) => db.collection('users')
      .updateOne({ _id: new ObjectId(id) }, { $set: newInfos }));
  }

  public async deleteUser(id: string) {
    return this.connection()
      .then((db) => db.collection('users')
      .deleteOne({ _id: new ObjectId(id) }))
  }

  public async getUserByLogin(email: string, password: string) {
    return this.connection()
      .then((db) => db.collection('users')
      .findOne({ email, password }));
  }

}

export default UserModel;
