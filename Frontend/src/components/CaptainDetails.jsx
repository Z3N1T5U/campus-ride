import React from 'react'
import {useSelector} from "react-redux";

export default function CaptainDetails() {

  const {currentCaptain} = useSelector((state)=> state.captain);

  return (
    <div>
      <div className="flex justify-between">
          <div className="flex items-center justify-start gap-3 w-3/4">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="h-10 w-10 rounded-full object-cover" />
            <h4 className='line-clamp-2 w-1/2 capitalize font-semibold'>{currentCaptain.fullName.firstName + ' ' + currentCaptain.fullName.lastName}</h4>
          </div>
          <div className="w-1/4 flex justify-center items-end flex-col">
            <h4 className='text-xl font-semibold'>₹ 210</h4>
            <p className='text-sm font-semibold text-gray-600'>Earned</p>
          </div>
        </div>
        <div className="flex pb-6 justify-center gap-5 items-start mt-6 bg-gray-100 rounded-xl p-4">
        <div className="text-center">
          <i className="text-3xl mb-2 ri-route-line"></i>
          <h5 className='text-lg font-medium'>54</h5>
          <p className='text-sm text-gray-600'>Trips Completed</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 ri-calendar-check-line"></i>
          <h5 className='text-lg font-medium'>7</h5>
          <p className='text-sm text-gray-600'>Today's Trips</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 ri-checkbox-circle-line text-green-600"></i>
          <h5 className='text-lg font-medium capitalize'>
            {currentCaptain?.status}
          </h5>
          <p className='text-sm text-gray-600'>Current Status</p>
        </div>
      </div>
    </div>
  )
}
