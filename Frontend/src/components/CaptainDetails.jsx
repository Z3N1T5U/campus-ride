import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function CaptainDetails() {

  const {currentCaptain} = useSelector((state)=> state.captain);

  const [stats, setStats] = useState({
  completedRides: 0,
  activeRides: 0,
  totalEarnings: 0,
  verificationStatus: "pending",
  averageRating: 0,
  rideChartData: [],
  peakHour: "N/A",
  demandPrediction: ""
});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const res = await axios.get(
        "/api/captains/dashboard-stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setStats(res.data);
      console.log("STATS RESPONSE:", res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async () => {
  try {

    console.log("BUTTON CLICKED");

    const res = await axios.patch(
      "/api/captains/toggle-status",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    console.log("RESPONSE:", res.data);

    fetchStats();

  } catch (error) {
    console.log(error.response?.data);
  }
};

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-3 w-3/4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <h4 className="capitalize font-semibold">
              {currentCaptain.fullName.firstName +
                " " +
                currentCaptain.fullName.lastName}
            </h4>

            <p className="text-sm text-yellow-600 font-medium">
              Verification: {stats.verificationStatus}
            </p>
          </div>
        </div>

        <div className="w-1/4 flex justify-center items-end flex-col">
          <h4 className="text-xl font-semibold">
            ₹ {stats.totalEarnings}
          </h4>
          <p className="text-sm font-semibold text-gray-600">
            Total Earned
          </p>
          <button
            onClick={toggleStatus}
            className="mt-2 bg-black text-white px-3 py-1 rounded-lg text-sm"
          >
            {stats.captainStatus === "active"
              ? "Go Offline"
              : "Go Online"}
          </button>
        </div>
      </div>

      <div className="flex pb-6 justify-center gap-5 items-start mt-6 bg-gray-100 rounded-xl p-4">

        <div className="text-center">
          <i className="text-3xl mb-2 ri-route-line"></i>
          <h5 className="text-lg font-medium">
            {stats.completedRides}
          </h5>
          <p className="text-sm text-gray-600">
            Completed Rides
          </p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 ri-car-line"></i>
          <h5 className="text-lg font-medium">
            {stats.activeRides}
          </h5>
          <p className="text-sm text-gray-600">
            Active Rides
          </p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 ri-star-fill text-yellow-500"></i>

          <h5 className="text-lg font-medium">
            {stats.averageRating}
          </h5>

          <p className="text-sm text-gray-600">
            Driver Rating
          </p>
        </div>

        <div className="text-center">
          <i
            className={`text-3xl mb-2 ${
              stats.captainStatus === "active"
                ? "ri-checkbox-circle-line text-green-600"
                : "ri-close-circle-line text-red-600"
            }`}
          ></i>

          <h5 className="text-lg font-medium capitalize">
            {stats.captainStatus}
          </h5>

          <p className="text-sm text-gray-600">
            Driver Status
          </p>
        </div>

      </div>
      <div className="bg-white rounded-xl p-4 shadow mt-6">

  <h3 className="text-lg font-semibold mb-4">
    Driver Analytics
  </h3>

  <div className="grid grid-cols-2 gap-4 mb-4">

    <div className="bg-gray-100 rounded-lg p-3">
      <p className="text-sm text-gray-500">
        Peak Hour
      </p>

      <h4 className="text-xl font-bold">
        {stats.peakHour}:00
      </h4>
    </div>

    <div className="bg-yellow-100 rounded-lg p-3">
      <p className="text-sm text-gray-500">
        Demand Prediction
      </p>

      <h4 className="font-semibold">
        High Demand
      </h4>
    </div>

  </div>

  <div style={{ width: "100%", height: 250 }}>

    <ResponsiveContainer>

      <BarChart data={stats.rideChartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="rides" />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>
    </div>
  );
}
