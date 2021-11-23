interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IRegisteredUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

interface IUserToken {
  id: string;
  name: string;
  email: string;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IPayload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

interface IRomans {
  [key: string]: number;
}

type Op = 'sum' | 'sub';
