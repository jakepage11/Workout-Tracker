'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Workout } from '@/types'

export interface WorkoutState {
  workouts: Workout[]
}

const initialState: WorkoutState = {
  workouts: [],
}

export const workoutSlice = createSlice({
  name: 'futureworkouts',
  initialState,
  reducers: {
    setFutureWorkouts: (state, action: PayloadAction<Workout[]>) => {
      console.log(action.payload)
      state.workouts = action.payload
    },
  }
})

export const { setFutureWorkouts } = workoutSlice.actions
export default workoutSlice.reducer