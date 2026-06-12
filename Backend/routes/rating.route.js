import express from "express";
import { body } from "express-validator";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import { submitRating } from "../controllers/rating.controller.js";

const router = express.Router();

router.post(
    "/submit",
    authUserMiddleware,
    body("rideId").isMongoId(),
    body("rating").isInt({ min: 1, max: 5 }),
    submitRating
);

router.get("/test", (req, res) => {
    res.json({
        message: "Rating routes working"
    });
});

export default router;