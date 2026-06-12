import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import uberLogo from "../../public/images/uber logo.png";
import CaptainDetails from '../components/CaptainDetails';
import Ridepopup from '../components/Ridepopup';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import CaptainConfirmRidePopup from '../components/CaptainConfirmRidePopup';

import { useSelector } from 'react-redux';
import { useSocket } from '../components/SocketConnect';
import LiveTracking from '../components/LiveTracking';

import { useNavigate } from 'react-router-dom';

let newSocket;

export default function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [socket, setSocket] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const { currentCaptain } = useSelector((state) => state.captain);
  const [ride, setRide] = useState(null);
  const [location, setLocation] = useState({
    ltd: currentCaptain?.location?.ltd || null,
    lng: currentCaptain?.location?.lng || null
  });

  const navigate = useNavigate();

  newSocket = useSocket();

  useEffect(() => {
  const restoreRide = async () => {
    try {
      const res = await fetch('/api/ride/current-captain-ride', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await res.json();

      console.log("[RESTORE RIDE]", data);

      if (!data) return;

      if (data.status === "accepted") {
        setRide(data);
        setConfirmRidePopup(true);
      }

      if (data.status === "ongoing") {
        navigate('/captain-riding', {
          state: { ride: data }
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

    restoreRide();
  }, []);

  useEffect(() => {
    setSocket(newSocket);
  }, [newSocket]);

  useEffect(() => {
    if (socket && currentCaptain) {
      newSocket.emit("join", {
        userId: currentCaptain._id,
        userType: 'captain'
      })
    }
  }, [socket]);

  useEffect(() => {
    const updateLocation = () => {
      if (!socket || !currentCaptain) return;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({ ltd: position.coords.latitude + 0.0006312660467, lng: position.coords.longitude -  0.00579800000001});
          socket.emit('update-location-captain', {
            userId: currentCaptain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 60000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    console.log("[CaptainHome] registering new-ride listener", socket.id);

    const handleNewRide = (data) => {
      console.log("[CaptainHome] NEW RIDE RECEIVED", data);

      setRide(data);

      console.log("[CaptainHome] opening popup");

      setRidePopupPanel(true);
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopup) {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePopup]);

  const confirmRide = async () => {
    if (!ride || !currentCaptain) {
      console.log("ride or captain is missing");
      return;
    }
    try {
      const res = await fetch("/api/ride/confirm", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rideId: ride._id, captainId: currentCaptain._id }),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setRidePopupPanel(false);
      setConfirmRidePopup(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  const hasLocation =
  typeof location.ltd === "number" &&
  typeof location.lng === "number";

  console.log("currentCaptain", currentCaptain);
  console.log("location", location);
  console.log("hasLocation", hasLocation);

  return (
    <div className='h-screen'>
      <div className="fixed p-3 top-0 w-full flex items-center justify-between z-20">
        <img src={uberLogo} alt="" className="w-16" />
        <Link to='/home' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className=" text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-[65%] relative">
        {hasLocation ? (
          <LiveTracking location={location} />
        ) : (
          <div className="h-full flex justify-center items-center">
            <div className="border-8 border-t-gray-800 border-black rounded-full w-16 h-16 animate-spin"></div>
          </div>
        )}
      </div>
      <div className="h-[35%] px-4 py-8">
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
        <Ridepopup ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopup={setConfirmRidePopup} confirmRide={confirmRide} />
      </div>

      <div ref={confirmRidePopupRef} className=" h-screen fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
        <CaptainConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} setRidePopupPanel={setRidePopupPanel} ride={ride} />
      </div>
    </div>
  )
}
