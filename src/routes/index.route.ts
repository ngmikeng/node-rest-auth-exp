import { Router, Request, Response } from "express";
import passport from "passport";
import config from "../config/config";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

const router = Router();

/** GET /health-check - Check service health */
/**
 * @swagger
 * /health-check:
 *   get:
 *     description: Check service health
 *     responses:
 *       200:
 *         description: 'OK'
 */
router.get("/health-check", (req: Request, res: Response) => res.send("OK"));

// mount auth routes at /auth
router.use("/auth", authRoutes);

// mount auth routes at /auth
router.use("/users", passport.authenticate("jwt", { session: false }), userRoutes);

export default router;
