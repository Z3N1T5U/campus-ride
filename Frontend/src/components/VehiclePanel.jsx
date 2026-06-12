import React from 'react'
import erick from "/images/e-rick.png";
import golfcart from "/images/golf-cart.png";

export default function VehiclePanel({setVehiclePanel, setConfirmRidePanel, fare, setSelectedFare, setVechicleImg, setVehicleType}) {

    const selectingVehicle = (price, image, type) => {
        setConfirmRidePanel(true);
        setSelectedFare(price);
        setVechicleImg(image);
        setVehicleType(type);
    }

    return (
        <div>
            <h5 onClick={() => setVehiclePanel(false)} className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"><i className="ri-arrow-down-wide-fill text-2xl text-gray-500"></i></h5>
            <h3 className="text-2xl font-semibold mb-3 mt-2">Choose Transport</h3>
            <div onClick={()=> selectingVehicle(fare.car, erick, "car")} className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                <img src={erick} alt="" className="h-10" />
                <div className="w-1/2">
                    <h4 className="font-semibold">
                        E-Rickshaw
                        <span className="text-sm pl-1">
                            <i className="ri-user-3-fill text-sm"></i>4
                        </span>
                        </h4>

                        <h5 className='text-xs'>Campus Transport</h5>

                        <p className='text-xs font-normal text-gray-600'>
                        Shared electric campus mobility
                        </p>
                </div>
                <h2 className='text-lg font-semibold'>{fare? `₹${(fare.car).toLocaleString('en-US')}` : ''}</h2>
            </div>
            <div onClick={()=> selectingVehicle(fare.auto,golfcart, "auto")} className="flex w-full p-3 items-center justify-between border-2 active:border-black rounded-md mb-2">
                <img src={golfcart} alt="" className="h-10" />
                <div className="w-1/2">
                    <h4 className="font-semibold">Golf Cart<span className="text-sm pl-1"><i className="ri-user-3-fill text-sm"></i>10</span></h4>
                    <h5 className='text-xs'>2 mins away</h5>
                    <p className='text-xs font-normal text-gray-600'>Premium campus transport</p>
                </div>
                <h2 className='text-lg font-semibold'>{fare? `₹${(fare.auto).toLocaleString('en-US')}` : ''}</h2>
            </div>
        </div>
    )
}
