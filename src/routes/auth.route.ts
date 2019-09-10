import { Router } from "express";
import passport from "passport";
import { login, randomNumber, refreshToken, googleSignIn } from "../controllers/auth.controller";
import authValidation from "../validation/auth.validation";
import { createValidator } from "express-joi-validation";
const validator = createValidator({ passError: true });
const router = Router();

/**
 * POST /api/v1/auth/login
 * - Returns token if correct username and password is provided
 */
/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: ["auth"]
 *    summary: Login
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: Login payload.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *          example:
 *            username: "typescript"
 *            password: "typescript"
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.post("/login", validator.body(authValidation.login.body), login);

/**
 * POST /api/v1/auth/refreshToken
 * - Refresh auth token
 */
/**
 * @swagger
 * /auth/refreshToken:
 *  post:
 *    tags: ["auth"]
 *    summary: Refresh auth token
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: Refresh token payload.
 *        schema:
 *          type: object
 *          properties:
 *            refreshToken:
 *              type: string
 *          example:
 *            refreshToken: "JWT_AUTH_TOKEN"
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.post("/refreshToken", validator.body(authValidation.refreshToken.body), refreshToken);

/**
 * POST /api/v1/auth/googleSignin
 * - Refresh auth token
 */
/**
 * @swagger
 * /auth/googleSignin:
 *  post:
 *    tags: ["auth"]
 *    summary: Google signin
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: id token
 *        description: Id token authenticated on frontend.
 *        schema:
 *          type: object
 *          properties:
 *            idToken:
 *              type: string
 *          example:
 *            idToken: "GG_ID_TOKEN"
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.post("/googleSignin", validator.body(authValidation.googleSignin.body), googleSignIn);

/**
 * GET /api/v1/auth/random-number
 * - Protected route, needs token returned by the above as header. Authorization: Bearer {token}
 */
/**
 * @swagger
 * /auth/randomNumber:
 *  get:
 *    tags: ["auth"]
 *    summary: Test protected route, get a random number
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.get("/randomNumber", passport.authenticate("jwt", { session: false }), randomNumber);

export default router;
