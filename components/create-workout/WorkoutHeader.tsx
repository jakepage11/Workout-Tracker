import React from 'react'
import MuscleIcon from "../../public/icons/MuscleWhite.png"
import { LocationOn, People } from '@mui/icons-material'

export default function WorkoutHeader({isLog, isEdit, editOn}: {isLog: boolean, isEdit: boolean, editOn: boolean}) {
  let editBtnStyle = 'border-2 border-[var(--pink)] rounded-full px-2 py-1 '
  editBtnStyle += editOn ? "bg-[var(--pink)]" : ""
  return (
    <div className='w-100vw bg-[var(--blue)] h-[var(--workout-header)] 
      rounded-full text-white px-4 flex gap-8 items-center relative'>
      <input className="text-black text-2xl rounded-full px-2" id="date"
        type="datetime-local" />
    
      <h6>~65 min</h6>
      <div>
        <img className="h-[30px]" src={MuscleIcon.src} alt=""/>
      </div>
      <div>
        <LocationOn />
      </div>
      <div>
        <People />
      </div>
      {isEdit && <div className='flex gap-8 absolute right-[5vw]'>
          <button className={editBtnStyle} >{editOn ? "Edit: ON" : "Edit: OFF"}</button>
          <button className='bg-[var(--yellow)] rounded-full px-2 py-1'>Save Changes</button>
        </div>
      }
    </div>
  )
}
