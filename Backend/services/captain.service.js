import captainModel from '../models/captain.model.js';

export const createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    aadhaarNumber,
    color,
    plate,
    capacity,
    vehicleType
}) => {

    if (
        !firstName ||
        !email ||
        !password ||
        !phoneNumber ||
        !aadhaarNumber ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },

        email,
        password,

        phoneNumber,
        aadhaarNumber,

        verificationStatus: "pending",

        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
};