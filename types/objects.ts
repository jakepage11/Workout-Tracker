import { nanoid } from "@reduxjs/toolkit"
class Exercise {
  id: string
  public Exercise(name: string) {
    id = nanoid()
    name = name
    
    load Int[]
    difficulty Int
  }
}