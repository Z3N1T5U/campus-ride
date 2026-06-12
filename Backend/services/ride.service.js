import rideModel from "../models/ride.model.js";
import { getDistanceTimeService, getAddressCordinate } from "./maps.service.js";
import { errorHandler } from "../middlewares/error.js";
import crypto from "crypto";
import { sendMessageToSocketId } from "../socket.js";


export const getFare = async (pickup, destination,passengerCount) => {
    if (!pickup || !destination || !passengerCount) {
        return errorHandler(400, "Pickup and destination are required");
    }

    const fare = passengerCount * 10;
    return {
        car: fare,
        auto: fare,
        bike: fare
    };
};


export const createRide = async ({ user, pickup, destination, vehicleType, pickupLocation, distance, duration, passengerCount }) => {
    if (!user || !pickup || !destination || !vehicleType || !pickupLocation || !distance || !duration || !passengerCount) {
        return errorHandler(400, "All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user, pickup: pickup.name, destination: destination.name, passengerCount,fare: fare[vehicleType]*passengerCount, otp: getOtp(6), pickupLocation, distance, duration
    });

    return ride;
}

export const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

export const getConfirmRide = async (rideId, captainId) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const updatedRide = await rideModel.findOneAndUpdate(
    {
        _id: rideId,
        status: 'pending'
    },
    {
        status: 'accepted',
        captain: captainId
    },
    {
        new: true
    }
    );

    if (!updatedRide) {
        throw new Error("Ride already accepted");
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};

export const rideStartedService = async (rideId, otp) => {
    if(!rideId || !otp){
        throw new Error('Ride id and Otp are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        return errorHandler(500, 'Ride not accepted');
    }

    if(ride.otp != otp){
        return errorHandler(500, 'Invalid Otp');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

export const endRideService = async (rideId, captain) => {
    if(!rideId) return errorHandler(404, "Ride id is required");

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        return errorHandler(404, "Ride not found");
    }

    if(ride.status !== 'ongoing'){
        return errorHandler(400, "Ride not ongoing");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: "completed"
    });

    return ride;
}