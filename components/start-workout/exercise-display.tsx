import { Exercise } from '@/types/types'
import { CheckBox, RemoveCircleOutline } from '@mui/icons-material'
import React from 'react'

export default function ExDisplay({ex, changeSet, index, markComplete, removeEx}: 
  {ex: Exercise, changeSet: Function, index: Number, markComplete: Function, removeEx: Function}) {
  const sets = ex.reps.map((r, i) => {
    let divStyles = 'grid grid-cols-5 text-sm items-center p-1'
    divStyles += ex.setComplete[i] ? " bg-green-200" : " bg-white"
    return <div className={divStyles}>
      <p>{`Set ${i + 1}`}</p>
      <p>Previous weight</p>
      <input className="bg-[var(--gray)] h-6 w-[60px] rounded-lg text-center" type="number" name="weight" onChange={(e) => changeSet(e.target, index, i)}/>
      <input className="bg-[var(--gray)] h-6 w-[60px] rounded-lg text-center" type="number" name="reps" onChange={(e) => changeSet(e.target, index, i)}/>
      {ex.setComplete[i] ? <CheckBox className='cursor-pointer text-green-400' onClick={() => markComplete(index, i)}/> 
      : <CheckBox className='cursor-pointer' onClick={() => markComplete(index, i)}/>}
    </div>})
  
  return (
    <div className="w-[100%] px-4 relative">
      <RemoveCircleOutline className='absolute right-1 top-1 text-[50px] text-red-400 cursor-pointer' onClick={() => removeEx(index)}/>
      <h6>{ex.name}</h6>
      <div className='flex flex-col items-center'>
        {sets}
        <button className='bg-[var(--gray)] w-[100%] text-sm h-6 rounded-md'>Add Set</button>
      </div>
    </div>
  )
}
