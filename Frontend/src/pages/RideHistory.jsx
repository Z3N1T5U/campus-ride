import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RideHistory() {

    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {

            const res = await axios.get(
                "/api/ride/history/user",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setRides(res.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const totalRides = rides.length;

    const totalSpent = rides.reduce(
        (sum, ride) => sum + ride.fare,
        0
    );

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-5">

            <h1 className="text-3xl font-bold mb-6">
                Ride History
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-white shadow rounded-xl p-4">
                    <h3 className="text-gray-500">
                        Total Rides
                    </h3>
                    <p className="text-2xl font-bold">
                        {totalRides}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-4">
                    <h3 className="text-gray-500">
                        Total Spent
                    </h3>
                    <p className="text-2xl font-bold">
                        ₹{totalSpent}
                    </p>
                </div>

            </div>

            <div className="space-y-4">

                {rides.map((ride) => (

                    <div
                        key={ride._id}
                        className="bg-white shadow rounded-xl p-4"
                    >

                        <h3 className="font-semibold text-lg">
                            {ride.pickup}
                        </h3>

                        <p className="text-gray-500">
                            ↓
                        </p>

                        <h3 className="font-semibold text-lg">
                            {ride.destination}
                        </h3>

                        <div className="mt-3 text-sm text-gray-600">

                            <p>
                                Fare: ₹{ride.fare}
                            </p>

                            <p>
                                Passengers: {ride.passengerCount}
                            </p>

                            <p>
                                Driver: {ride.captain?.fullName?.firstName}{" "}
                                {ride.captain?.fullName?.lastName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}