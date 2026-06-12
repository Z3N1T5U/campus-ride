import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import uberLogo from "../../public/images/uber logo.png";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import FinishedRide from '../components/FinishedRide';
import LiveTracking from '../components/LiveTracking';
import { useSelector } from 'react-redux';

export default function CaptainRiding() {

    console.log("CAPTAIN RIDING MOUNTED", Date.now());

    const [finishedRidePanel, setFinishedRidePanel] = useState(false);
    const finishedRidePanelRef = useRef(null);

    const routerLocation = useLocation();
    const ride = routerLocation.state?.ride;

    const [position, setPosition] = useState({
        ltd: "",
        lng: ""
    });

    const { currentCaptain } = useSelector((state) => state.captain);

    useGSAP(() => {
        if (finishedRidePanel) {
            gsap.to(finishedRidePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(finishedRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [finishedRidePanel]);

    useEffect(() => {
        if (currentCaptain?.location) {
            setPosition({
                ltd: currentCaptain.location.ltd,
                lng: currentCaptain.location.lng
            });
        }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setPosition({
                ltd: position.coords.latitude,
                lng: position.coords.longitude
            });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 60000
        }
      );
    }, []);


    const hasLocation =
        typeof position.ltd === "number" &&
        typeof position.lng === "number";

    return (
        <div className='h-screen'>

            <div className="fixed p-3 top-0 w-full flex items-center justify-between z-20">
                <img src={uberLogo} alt="" className="w-16" />

                <Link
                    to='/home'
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className={`h-[80%] relative ${!hasLocation ? 'z-50' : 'z-10'}`}>

                {!hasLocation && (
                    <div className="w-full h-screen flex justify-center items-center bg-white z-30">
                        <div className="border-8 border-t-8 border-t-gray-800 border-black rounded-full w-16 h-16 animate-spin"></div>
                    </div>
                )}

                {hasLocation && (
                    <LiveTracking location={position} />
                )}

            </div>

            <div
                onClick={() => setFinishedRidePanel(true)}
                className="h-[20%] flex items-center justify-evenly relative bg-yellow-400"
            >
                <h5 className="p-1 text-center w-full absolute top-0">
                    <i className="ri-arrow-up-wide-line text-2xl text-gray-500"></i>
                </h5>

                <h4 className="text-xl font-semibold">
                    {ride?.distance} KM away
                </h4>

                <button className="bg-green-600 text-white font-semibold p-3 px-6 rounded-lg">
                    Complete Ride
                </button>
            </div>

            <div
                ref={finishedRidePanelRef}
                className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full"
            >
                <FinishedRide
                    setFinishedRidePanel={setFinishedRidePanel}
                    ride={ride}
                />
            </div>

        </div>
    );
}