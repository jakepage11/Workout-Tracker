import { Exercise, ExerciseInfo } from '@/types/types'
import { Sell } from '@mui/icons-material'
import MuscleIcon from "../../public/icons/Muscle.png"
import BarbellsIcon from "../../public/icons/Barbells.png"
import React from 'react'

export default function ExerciseItem({exercise, exinfo}: {exercise: Exercise, exinfo: ExerciseInfo|undefined}) {
  const muscles = exinfo?.muscles.join(" ")
  const equipment = exinfo?.equipment.join(" ")
  const tags = exinfo?.tags.join(" ")
  return (
    <div className='bg-[var(--light-blue)] rounded-md px-2 py-1'>
      <div className='flex gap-2'>
        <h2 className='text-md'>{exercise.name}</h2>
        <b><p>{exercise.reps.length} sets</p></b>
      </div>
      <div className='flex gap-2 text-[8px]'>
        <div className='flex gap-1'>
          <Sell style={{"fontSize": "10px"}}/>
          {tags}
        </div>
        {/* muscles */}
        <div className='flex gap-1'>
          <img src={MuscleIcon.src} style={{"width": "10px"}}/>
          {muscles}
        </div>
        {/* equipmment */}
        <div className='flex gap-1'>
          <img src={BarbellsIcon.src} style={{"width": "10px"}}/>
          {equipment}
        </div>
      </div>
    </div>
  )
}
