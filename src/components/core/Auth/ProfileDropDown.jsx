import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscSignOut } from "react-icons/vsc"
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
const ProfileDropDown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);
    return (
        <button onClick={() => setOpen(!open)} className='relative'>

            <div className='flex items-center gap-x-1'>
                <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[30px] rounded-full object-cover" />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>


            {open && (

                <div onClick={(e) => e.stopPropagation()} className='absolute border-richblack-700 bg-richblack-800 overflow-hidden border-[1px] top-[118%] right-0 z-[1000] divide-y-[1px]'>

                    <div onClick={() => {
                        dispatch(logout(navigate))
                        setOpen(false)
                    }} className='flex  gap-x-1 w-full items-center py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                        <VscSignOut className="text-lg" />
                        Logout
                    </div>
                </div>


            )
            }
        </button>


    )
}

export default ProfileDropDown