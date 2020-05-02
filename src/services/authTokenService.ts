
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";

export const AUTH_TOKEN_EXPIRES_IN = "60 seconds";
export const REFRESH_TOKEN_EXPIRES_IN = "5 minutes";

/**
 * Auth token use JWT
 */
export class AuthToken {
  option: SignOptions = {
    expiresIn: AUTH_TOKEN_EXPIRES_IN
  };
  payload: string | object = {};

  constructor(payload: string | object, option?: SignOptions) {
    if (option) {
      this.option = option;
    }
    if (payload) {
      this.payload = payload;
    }
  }

  async generate(): Promise<string> {
    let result;
    try {
      result = jwt.sign(this.payload, config.jwtSecret, this.option);
    } catch (err) {
      throw err;
    }
    return result;
  }
}
