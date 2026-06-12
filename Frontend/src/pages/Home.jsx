import React, { useRef, useState, useEffect } from 'react'
import iitrblacklogo from '/images/campusblack_logo.png';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LokingForDriver from '../components/LokingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import {useNavigate} from "react-router-dom";

import { useSocket } from '../components/SocketConnect';
import { useSelector } from 'react-redux';
import LiveTracking from '../components/LiveTracking';

import { useDebounceCallback } from 'usehooks-ts';
import axios from 'axios';

import campusLocations from "../data/campusLocations";

let newSocket;
export default function Home() {

  const [pickup, setPickup] = useState({
    name: 'Current Location',
    ltd: null,
    lng: null
  });
  const [destination, setDestination] = useState({
    name: '',
    ltd: null,
    lng: null
  });
  const [passengerCount, setPassengerCount] = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [restoringRide, setRestoringRide] = useState(false);
  const panelRef = useRef(null);
  const showBtnRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  const [vehicleImg, setVechicleImg] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [ride, setRide] = useState(null);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vechidleFoundlRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const hasCoordinates = (location) => (
    typeof location?.ltd === 'number' &&
    typeof location?.lng === 'number'
  );

  const hasPickupLocation = hasCoordinates(pickup);
  const hasDestinationLocation = hasCoordinates(destination);

  // debounce time
  const debounced = useDebounceCallback(fetchSuggestions, 400);

  newSocket = useSocket();

  useEffect(() => {
    setSocket(newSocket);
  }, [newSocket]);

  useEffect(() => {
    if (socket && currentUser) {
      newSocket.emit("join", {
        userId: currentUser._id,
        userType: 'user'
      })
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      newSocket.on('ride-confirmed', (data) => {
        setWaitingForDriver(true);
        console.log(data);
        setRide(data);
      })
    }
  }, [socket]);

  useEffect(() => {
    if(socket){
      newSocket.on('ride-started', (ride) => {
        setWaitingForDriver(false);
        navigate('/riding', {state: {ride: ride}});
      })
    }
  }, [socket]);

useEffect(() => {
  const restoreRide = async () => {
    try {
      const res = await fetch('/api/ride/current-user-ride', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await res.json();

      if (!data) {
        console.log("No active ride found");
        return;
      }

      console.log("Restored ride:", data);

      setRide(data);
      setRestoringRide(true);

      // Accepted ride → stay on Home and show banner
      if (data.status === 'accepted') {
        setWaitingForDriver(true);

        setTimeout(() => {
          setRestoringRide(false);
        }, 1500);

        return;
      }

      // Ongoing ride → show banner then navigate
      if (data.status === 'ongoing') {
        setTimeout(() => {
          setRestoringRide(false);

          navigate('/riding', {
            state: { ride: data }
          });
        }, 1500);

        return;
      }

    } catch (error) {
      console.log(error);
    }
  };

  restoreRide();
}, []);

  const handleSumbit = (e) => {
    e.preventDefault();

  }

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup((prev) => ({
      ...prev,
      name: value,
      ltd: null,
      lng: null
    }));
    setActiveField('pickup');
    fetchSuggestions(value);
  }

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination((prev) => ({
      ...prev,
      name: value,
      ltd: null,
      lng: null
    }));
    setActiveField('destination');
    debounced(value);
  }

  async function fetchSuggestions(locationQuery) {
    try {
      const query = typeof locationQuery === 'string'
        ? locationQuery.trim()
        : locationQuery?.name?.trim() || '';

      if (query.length < 3) {
        setSuggestion(null);
        return;
      }

      console.log("input ", query)
      console.log("first running fetchSuggestion")

      const search = query.toLowerCase();

      const filteredLocations = campusLocations
        .filter(location => {
          return (
            location.name.toLowerCase().includes(search) ||
            (location.aliases &&
              location.aliases.some(alias =>
                alias.toLowerCase().includes(search)
              ))
          );
        })
        .slice(0, 8)
        .map(location => ({
          name: location.name,
          ltd: location.lat,
          lng: location.lng
        }));

      setSuggestion(filteredLocations);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "75%"
      });
      gsap.to(showBtnRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%"
      });
      gsap.to(showBtnRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);


  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vechidleFoundlRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vechidleFoundlRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [waitingForDriver]);

  const handleFindTrip = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/ride/get-fare", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup, destination, passengerCount
        })
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        setLoading(false);
        return;
      }
      setFare(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setVehiclePanel(true);
    setPanelOpen(false);
  }

  const createRide = async () => {
    try {
      const res = await fetch("/api/ride/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup,
          destination,
          vehicleType,
          passengerCount,
          pickupLocation: {
            ltd: pickup.ltd,
            lng: pickup.lng
          }
        })
      });

      const data = await res.json();
      if (data.success === false) {
        return;
        console.log(data.message);
      }
      console.log("created ride: ", data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("user current location is added");
          setPickup({
            name: "Current Location",
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      }
    }
    updateLocation();
  }, []);

  return (
    <div className='h-screen relative'>
      {restoringRide && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded-lg shadow-lg z-[9999]">
            Active Ride Found • Restoring Session...
        </div>
      )}
      <img src={iitrblacklogo} alt="" className="w-16 mb-5 absolute top-5 left-5 z-20" />
      <div className="h-screen w-screen relative z-10">
        {hasPickupLocation && (
          <LiveTracking location={pickup} />
        )}
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full z-20">
        <div className="h-[32%] p-5 bg-white relative">
          <h5 ref={showBtnRef} onClick={() => setPanelOpen(false)} className='absolute top-2 right-3 text-2xl cursor-pointer'><i className="ri-arrow-down-wide-fill"></i></h5>
          <h4 className='text-2xl font-semibold'>Book Campus Ride</h4>
          <form onSubmit={handleSumbit} className="relative">
            <div className="line absolute h-16 w-1 top-[25%] left-4 bg-gray-700 rounded-full"></div>
            <input type="text" id='pickup' className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full outline-none" placeholder='Add a pick-up location' onClick={() => setPanelOpen(true)} onChange={handlePickupChange} value={pickup.name} />
            <input type="text" id='destination' className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 outline-none" placeholder='Enter your destination' onClick={() => setPanelOpen(true)} onChange={handleDestinationChange} value={destination.name} />
          </form>
          <button onClick={handleFindTrip} disabled={!hasPickupLocation || !hasDestinationLocation} className="bg-black text-white px-4 py-2 rounded-md w-full font-semibold my-4 disabled:bg-[#4b3a3a] relative h-14 overflow-hidden flex items-center justify-center">{loading ?
            <div className="border-4 border-t-4 border-t-white border-gray-300 rounded-full h-8 w-8 animate-spin absolute"></div>
            : 'Find Trip'}</button>
        </div>

        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestion={suggestion}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setSuggestion={setSuggestion}
          />

          <div className="mt-3 px-3 pb-3">
            <label className="block text-sm font-medium mb-2">
              Number of Passengers
            </label>

            <select
              value={passengerCount}
              onChange={(e) => setPassengerCount(Number(e.target.value))}
              className="w-full p-3 rounded-lg border"
            >
              <option value={1}>1 Passenger</option>
              <option value={2}>2 Passengers</option>
              <option value={3}>3 Passengers</option>
              <option value={4}>4 Passengers</option>
            </select>
          </div>
        </div>

        <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} fare={fare} setSelectedFare={setSelectedFare} setVechicleImg={setVechicleImg} setVehicleType={setVehicleType} />
        </div>

        <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} pickup={pickup} destination={destination} selectedFare={selectedFare} vehicleImg={vehicleImg} createRide={createRide} />
        </div>

        <div ref={vechidleFoundlRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <LokingForDriver setVehicleFound={setVehicleFound} pickup={pickup} destination={destination} selectedFare={selectedFare} />
        </div>

        <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full">
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} ride={ride} />
        </div>
      </div>
    </div>
  )
}
