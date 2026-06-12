import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import blackListToken from "../models/blocklistToken.model.js";
import { errorHandler } from "../middlewares/error.js";
import rideModel from "../models/ride.model.js";
import Rating from "../models/rating.model.js";

export const signUpCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({errors: errors.array()});
        return next(errorHandler(400, errors.array()))
    }

    const {fullName, email, password, 
        vehicle,phoneNumber,
        aadhaarNumber} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return next(errorHandler(400, "User already exist through this email"));
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,

        phoneNumber,
        aadhaarNumber,

        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,

        userType: 'captain',
    });

    const token = captain.generateAuthToken();

    const {password: pass, ...rest} = captain._doc;
    res.status(201).json({token, captain: rest});
};

export const captainLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(errorHandler(400, errors.array()));
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password");
    
    if(!captain){
        return next(errorHandler(400, "Invalid email or password"));
    }

    const isPasswordMatched = await captain.comparePassword(password);
    if(!isPasswordMatched){
        return next(errorHandler(400, "Invalid Password"));
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    const {password: pass, ...rest} = captain._doc;
    res.status(200).json({token, captain: rest});
};

export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
};

export const captainLogout = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListToken.create({token});

    res.clearCookie("token");

    res.status(200).json({message: "Logout successfully"});
}

export const getCaptainDashboardStats = async (req, res, next) => {
    try {

        const completedRides = await rideModel.countDocuments({
            captain: req.captain._id,
            status: "completed"
        });

        const activeRides = await rideModel.countDocuments({
            captain: req.captain._id,
            status: {
                $in: ["accepted", "ongoing"]
            }
        });

        const completedRideDocs = await rideModel.find({
            captain: req.captain._id,
            status: "completed"
        });

        const totalEarnings = completedRideDocs.reduce(
            (sum, ride) => sum + ride.fare,
            0
        );

        const ratings = await Rating.find({
            captain: req.captain._id
        });

        const averageRating =
            ratings.length > 0
                ? (
                    ratings.reduce(
                        (sum, rating) => sum + rating.rating,
                        0
                    ) / ratings.length
                ).toFixed(1)
                : 0;

        // Monthly Ride Chart

            const monthMap = {};

            completedRideDocs.forEach((ride) => {

                if (!ride.createdAt) return;

                const date = new Date(ride.createdAt);

                if (isNaN(date.getTime())) return;

                const month = date.toLocaleString(
                    "default",
                    {
                        month: "short"
                    }
                );

                monthMap[month] =
                    (monthMap[month] || 0) + 1;
            });

            const rideChartData = Object.keys(monthMap)
                .map((month) => ({
                    month,
                    rides: monthMap[month]
                }));           

        // Peak Hour

        const hourMap = {};

        completedRideDocs.forEach((ride) => {

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

        const captain = await captainModel.findById(
            req.captain._id
        );

        return res.status(200).json({
            completedRides,
            activeRides,
            totalEarnings,
            averageRating,
            verificationStatus: req.captain.verificationStatus,
            captainStatus: captain.status,

            rideChartData,
            peakHour,
            demandPrediction
        });

    } catch (error) {
        next(error);
    }
};

export const toggleCaptainStatus = async (req, res, next) => {
    try {

        const captain = await captainModel.findById(req.captain._id);

        console.log("CURRENT STATUS:", captain.status);

        const newStatus =
            captain.status === "active"
                ? "inactive"
                : "active";

        console.log("NEW STATUS:", newStatus);

        const updatedCaptain = await captainModel.findByIdAndUpdate(
            req.captain._id,
            {
                status: newStatus
            },
            {
                new: true
            }
        );

        console.log("AFTER UPDATE:", updatedCaptain.status);

        return res.status(200).json({
            status: updatedCaptain.status
        });

    } catch (error) {
        next(error);
    }
};

export const approveCaptain = async (req, res, next) => {
    try {

        const captain = await captainModel.findByIdAndUpdate(
            req.params.id,
            {
                verificationStatus: "approved"
            },
            {
                new: true
            }
        );

        res.status(200).json(captain);

    } catch (error) {
        next(error);
    }
};

export const rejectCaptain = async (req, res, next) => {
    try {

        const captain = await captainModel.findByIdAndUpdate(
            req.params.id,
            {
                verificationStatus: "rejected"
            },
            {
                new: true
            }
        );

        res.status(200).json(captain);

    } catch (error) {
        next(error);
    }
};