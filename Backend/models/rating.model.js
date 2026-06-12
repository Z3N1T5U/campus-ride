import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
{
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
        required: true
    },

    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    feedback: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Rating", ratingSchema);