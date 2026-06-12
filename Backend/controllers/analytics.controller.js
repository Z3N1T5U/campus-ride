import rideModel from "../models/ride.model.js";
import Rating from "../models/rating.model.js";

export const getAnalyticsDashboard = async (req, res, next) => {
    try {

        const rides = await rideModel.find({
            status: "completed"
        });

        const ratings = await Rating.find();

        const totalRides = rides.length;

        const totalRevenue = rides.reduce(
            (sum, ride) => sum + ride.fare,
            0
        );

        const averageRating =
            ratings.length > 0
                ? (
                    ratings.reduce(
                        (sum, rating) => sum + rating.rating,
                        0
                    ) / ratings.length
                ).toFixed(1)
                : 0;

        // Popular Route

        const routeMap = {};

        rides.forEach((ride) => {

            const route =
                `${ride.pickup} → ${ride.destination}`;

            routeMap[route] =
                (routeMap[route] || 0) + 1;
        });

        const popularRoute =
            Object.keys(routeMap).length
                ? Object.keys(routeMap).reduce(
                    (a, b) =>
                        routeMap[a] > routeMap[b]
                            ? a
                            : b
                )
                : "No Data";

        // Peak Hour

        const hourMap = {};

        rides.forEach((ride) => {

            if (!ride.createdAt) return;

            const hour = new Date(
                ride.createdAt
            ).getHours();

            if (isNaN(hour)) return;

            hourMap[hour] =
                (hourMap[hour] || 0) + 1;
        });

        const peakHour =
            Object.keys(hourMap).length
                ? Object.keys(hourMap).reduce(
                    (a, b) =>
                        hourMap[a] > hourMap[b]
                            ? a
                            : b
                )
                : "N/A";

        const demandPrediction =
            peakHour !== "N/A"
                ? `High demand expected around ${peakHour}:00`
                : "Not enough data";

        return res.status(200).json({
            totalRides,
            totalRevenue,
            averageRating,
            popularRoute,
            peakHour,
            demandPrediction
        });

    } catch (error) {
        next(error);
    }
};