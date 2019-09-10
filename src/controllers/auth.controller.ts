import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import APIError from "../helpers/errorHandlers/APIError";
import { responseSuccess } from "../helpers/responseHandlers/index";
import config from "../config/config";
import { RefreshTokenStore, GgAuthService } from "../services/index";
const refreshTokenStore = new RefreshTokenStore();


// sample user, used for authentication
const MOCK_USER = {
  username: "typescript",
  password: "typescript"
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function login(req: Request, res: Response, next: NextFunction) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.username === MOCK_USER.username && req.body.password === MOCK_USER.password) {
    const token = jwt.sign({ username: MOCK_USER.username }, config.jwtSecret, { expiresIn: "60 seconds" });
    const refreshToken = jwt.sign({ username: MOCK_USER.username }, config.jwtSecret, { expiresIn: "5 minutes" });
    // save refresh token in local memory
    refreshTokenStore.setPayload(refreshToken, {username: req.body.username});

    return res.json(responseSuccess({
      token: token,
      refreshToken: refreshToken,
      username: MOCK_USER.username
    }));
  }

  return next(new APIError("Authentication error", httpStatus.UNAUTHORIZED, true));
}

/**
 * Returns new auth token if refresh token is exists and valid
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function refreshToken(req: Request, res: Response, next: NextFunction) {
  if (req.body.refreshToken) {
    // get refresh token from local memory
    const refreshTokenPayload = refreshTokenStore.getPayload(req.body.refreshToken);
    if (refreshTokenPayload) {
      // verify is refresh token valid
      jwt.verify(req.body.refreshToken, config.jwtSecret, (err: Error, decoded: {username: string}) => {
        if (err) {
          return next(new APIError(`Authentication error: ${err.message}`, httpStatus.UNAUTHORIZED, true));
        } else {
          const token = jwt.sign({ username: decoded.username }, config.jwtSecret, { expiresIn: "60 seconds" });

          return res.json(responseSuccess({ token: token }));
        }
      });
    } else {
      return next(new APIError("Authentication error", httpStatus.UNAUTHORIZED, true));
    }
  } else {
    return next(new APIError("Authentication error", httpStatus.UNAUTHORIZED, true));
  }
}

/**
 * Returns new auth token if refresh token is exists and valid
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function googleSignIn(req: Request, res: Response, next: NextFunction) {
  if (req.body.idToken) {
    // TODO verify id token to google
    const ggAuthService = new GgAuthService();
    ggAuthService.verify(req.body.idToken).then(payload => {
      // TODO check is associated to google account. If false write info of social provider and create user account if no exists yet.
      // Generate auth token & refresh token.
      const token = jwt.sign({ username: payload.email }, config.jwtSecret, { expiresIn: "60 seconds" });
      const refreshToken = jwt.sign({ username: payload.email }, config.jwtSecret, { expiresIn: "5 minutes" });
      // Save refresh token in local memory.
      refreshTokenStore.setPayload(refreshToken, {username: payload.email});
  
      return res.json(responseSuccess({
        payload: payload
      }));
    }).catch(err => {
      return next(err);
    });
  } else {
    return next(new APIError("Request payload invalid", httpStatus.BAD_REQUEST, true));
  }

}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
export function randomNumber(req: Request, res: Response) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json(responseSuccess({
    user: req.user,
    num: Math.random() * 100
  }));
}
