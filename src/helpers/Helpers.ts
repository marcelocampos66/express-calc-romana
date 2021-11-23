import joi from 'joi';
import md5 from 'md5';

class Helpers {

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

}

export default Helpers;
