'use client'
import React, { useEffect } from 'react'
import {useState} from "react"
import { ExerciseInfo } from '@/types/types'

export default function AddExModal({closeModal, exercises, addExercise}: 
  {closeModal: Function, exercises: ExerciseInfo[], addExercise: Function}) {
  const [query, setQuery] = useState<string>(() => {return ""})
  const searchResults = exercises ? exercises.filter((ex: ExerciseInfo) => ex.name.toLowerCase().includes(query.toLowerCase())) : exercises
  const resultNames = searchResults.map((ex) => {
    return <div key={ex.id} className="cursor-pointer" onClick={() => {addExercise(ex.name); closeModal()}}>{ex.name}</div>
  })

  return (
    <div className='absolute left-1/2 transform -translate-x-1/2 bg-gray-400 z-10 w-[90%] h-[80vh]'>
      <input placeholder='Search' onChange={(e) => setQuery(e.target.value)}/>
      {resultNames}
      <button onClick={() => {closeModal()}}>Exit</button>
    </div>
  )
}
