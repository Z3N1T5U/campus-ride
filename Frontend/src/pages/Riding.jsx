import React, { useEffect, useState } from 'react'
import uberCar from "/images/uber car.webp";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../components/SocketConnect';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { useSelector } from 'react-redux';

export default function Riding() {
    const location = useLocation();
    const ride = location.state?.ride;

    const newSocket = useSocket();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const [position, setPoisition] = useState({
        ltd: "",
        lng: ""
    });

    // Re-register socket after refresh
    useEffect(() => {
        if (!newSocket || !currentUser) return;

        console.log("REJOINING USER SOCKET");

        newSocket.emit("join", {
            userId: currentUser._id,
            userType: "user"
        });

    }, [newSocket, currentUser]);

    // Listen for ride completion
    useEffect(() => {
        if (!newSocket) return;

        const handleRideEnded = () => {
            console.log("RIDE ENDED EVENT RECEIVED");
            navigate("/home");
        };

        newSocket.on("ride-ended", handleRideEnded);

        return () => {
            newSocket.off("ride-ended", handleRideEnded);
        };
    }, [newSocket, navigate]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPoisition({
                ltd: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }, []);

    const hasLocation =
        typeof position.ltd === "number" &&
        typeof position.lng === "number";


    return (
        <div className='h-screen'>
            <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-20">
                <i className="text-lg ri-home-4-fill"></i>
            </Link>
            <div className="h-1/2 relative z-10">
                {hasLocation && (
                 <>
                    {console.log("Rendering map with", position)}
                    <LiveTracking location={position} />
                 </>
                )}
            </div>

            <div className="h-1/2 px-4 py-8">
                <div className="flex items-center justify-between">
                    <div className="relative w-[30%]">
                        <div className="w-14 h-14 rounded-full border-2 border-gray-300 overflow-hidden relative z-20">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbU49DD_iYcjSUEXG-Oy7POjJzaMn1GYEZg&s" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-14 h-14 rounded-full border-2 border-gray-400 overflow-hidden absolute top-0 right-2 z-10">
                            <img src={uberCar} alt="" className="w-full h-full object-contain relative" />
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className='text-lg'>{ride?.captain.fullName.firstName + " " + ride?.captain.fullName.lastName}</h2>
                        <h4 className='font-semibold text-xl -mt-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-xs text-gray-600 -mt-1'>Maruti Suzuke Alto</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-2">
                    <div className="w-full mt-5">

                        <div className="flex items-center gap-5 p-2 border-b-2">
                            <i className="ri-map-pin-2-fill text-xl"></i>
                            <div className="">
                                <h3 className='font-semibold text-lg line-clamp-2'>{ride?.destination}</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-2">
                            <i className="ri-money-rupee-circle-fill text-xl"></i>
                            <div className="">
                                <h3 className='font-semibold text-lg'>₹{ride?.fare.toLocaleString('en-US')}</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 mt- bg-green-600 text-white  px-2 py-3 rounded-lg text-lg'>Make a Payment</button>
            </div>
        </div>
    )
}
