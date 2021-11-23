import joi from 'joi';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

class Helpers {
  private secret: jwt.Secret;
  private jwtConfig: jwt.SignOptions;

  constructor() {
    this.secret = process.env.JWT_SECRET as jwt.Secret;
    this.jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  }

  public verifyUserInfosJoi = (infos: IUser) => (
    joi.object({
      name: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).validate(infos)
  );

  public hashPassword(password: string): string {
    return md5(password);
  }

  public generateToken(userData: IUserToken) {
    const { id, name, email } = userData;
    return jwt.sign({ id, name, email }, this.secret, this.jwtConfig);
  }

  public verifyLoginCredentialsJoi = (credentials: ICredentials) => (
    joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).validate(credentials)
  );

  public formatUserToGetToken(user: any) {
    return ({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  }

}

export default Helpers;
