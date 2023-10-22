import { ExerciseInfo } from '@/types/types'
import React from 'react'
import { ChangeEvent, useState} from "react"

// Takes in user input and list of all exercises and displays the search bar and top
// search results (user can scroll through result as well)
export default function SearchBar({query, all_exercises, updateName} 
  : {query: string, all_exercises: Array<ExerciseInfo>, updateName: Function}) {

  const [showResults, setShowResults] = useState(false)
  
  const filtered = all_exercises.filter((ex: ExerciseInfo) => ex.name.toLowerCase().includes(query.toLowerCase()))
  const filteredNames = filtered.map((ex) => {
    return <div className="cursor-pointer" onClick={(e) => {updateName(e, undefined, ex.name)}}>{ex.name}</div>
  })

  return (
    <div>
      {/* Search Bar */}
      <input id="set_display_search" className="w-[250px] h-[40px] px-2 mt-2 rounded-lg" placeholder='Exercise Name' 
          value={query} name="name" onChange={(e) => updateName(e)} onFocus={() => setShowResults(true)} 
          onBlur={() => {setTimeout(() => {setShowResults(false)}, 100)}} autoComplete="off"
         />
      {/* Search Results */}
      {showResults && <div className='absolute bg-white w-[250px] h-fit z-10 flex flex-col gap-2'>
        {filteredNames}
      </div>}
    </div>
  )
}
