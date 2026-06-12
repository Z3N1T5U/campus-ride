import Rating from "../models/rating.model.js";
import rideModel from "../models/ride.model.js";

export const submitRating = async (req, res, next) => {
    try {

        const { rideId, rating, feedback } = req.body;

        const ride = await rideModel.findById(rideId);

        if (!ride) {
            return res.status(404).json({
                message: "Ride not found"
            });
        }

        if (ride.isRated) {
            return res.status(400).json({
                message: "Ride already rated"
            });
        }

        const newRating = await Rating.create({
            ride: ride._id,
            captain: ride.captain,
            user: req.user._id,
            rating,
            feedback
        });

        ride.isRated = true;
        await ride.save();

        return res.status(201).json(newRating);

    } catch (error) {
        next(error);
    }
};