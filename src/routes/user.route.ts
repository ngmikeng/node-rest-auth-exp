import { Router } from "express";
import Joi from "@hapi/joi";
import * as userCtrl from "../controllers/user.controller";
import userValidation from "../validation/user.validation";
import { createValidator } from "express-joi-validation";
const validator = createValidator();

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *    tags: ["user"]
 *    summary: Get list users
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 *  post:
 *    tags: ["user"]
 *    summary: Create an user
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: User payload.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            fullName:
 *              type: string
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route("/")
  /** GET /api/v1/users - Get list of users */
  .get(userCtrl.list)
  /** POST /api/users - Create new user */
  .post(validator.body(userValidation.createUser.body), userCtrl.create);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    tags: [user]
 *    summary: Get an user by user's id
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        description: User's id.
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route("/:userId")
  /** GET /api/v1/users/:userId - Get user */
  .get(validator.params(userValidation.getById.params), userCtrl.get);

/** Load user when API with userId route parameter is hit */
router.param("userId", (req, res, next, id) => {
  try {
    const result = Joi.validate(id, userValidation.userId);
    if (result.error) {
      return next(result.error);
    }
    return userCtrl.load(req, res, next, id);
  } catch (err) {
    next(err);
  }
});

export default router;
