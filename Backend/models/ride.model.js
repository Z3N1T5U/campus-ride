import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },

    pickup: {
        type: String,
        requird: true,
    },

    destination: {
        type: String,
        requird: true,
    },

    fare: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },

    passengerCount: {
        type: Number,
        default: 1
    },

    duration: {
        type: Number,
    },

    distance: {
        type: Number,
    },

    paymentId: {
        type: String,
    },

    orderId: {
        type: String,
    },

    signature: {
        type: String,
    },

    otp: {
        type: String,
        select: false,
        required: true,
    },

    pickupLocation: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }

}, {
    timestamps: true
});

const rideModel = mongoose.model("Ride", rideSchema);
export default rideModel;