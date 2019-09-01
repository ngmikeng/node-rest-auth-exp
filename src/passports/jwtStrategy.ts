import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import config from "../config/config";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export const JwtStrategy = new Strategy(options, (jwtPayload, done) => {
  const user = jwtPayload;
  done(null, user);
});
