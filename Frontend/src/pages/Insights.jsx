import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Insights() {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {

            const res = await axios.get(
                "/api/analytics/dashboard"
            );

            setAnalytics(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!analytics) {
        return (
            <div className="p-10 text-center">
                Loading Insights...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-5">

            <h1 className="text-3xl font-bold mb-6">
                Campus Insights
            </h1>

            <div className="grid grid-cols-2 gap-4">

                <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="text-gray-500">
                        Total Rides
                    </h3>
                    <p className="text-3xl font-bold">
                        {analytics.totalRides}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="text-gray-500">
                        Revenue
                    </h3>
                    <p className="text-3xl font-bold">
                        ₹{analytics.totalRevenue}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="text-gray-500">
                        Average Rating
                    </h3>
                    <p className="text-3xl font-bold">
                        ⭐ {analytics.averageRating}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="text-gray-500">
                        Peak Hour
                    </h3>
                    <p className="text-3xl font-bold">
                        {analytics.peakHour}:00
                    </p>
                </div>

            </div>

            <div className="bg-white rounded-xl p-4 shadow mt-4">
                <h3 className="text-gray-500 mb-2">
                    Most Popular Route
                </h3>

                <p className="font-semibold">
                    {analytics.popularRoute}
                </p>
            </div>

            <div className="bg-yellow-100 rounded-xl p-4 mt-4">
                <h3 className="font-semibold">
                    Demand Prediction
                </h3>

                <p>
                    {analytics.demandPrediction}
                </p>
            </div>

        </div>
    );
}