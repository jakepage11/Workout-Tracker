'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Workout } from '@/types/types'

export interface WorkoutState {
  workouts: Workout[]
}

const initialState: WorkoutState = {
  workouts: [],
}

export const futureWorkoutSlice = createSlice({
  name: 'futureworkouts',
  initialState,
  reducers: {
    setFutureWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload
    },
  }
})

export const { setFutureWorkouts } = futureWorkoutSlice.actions
export default futureWorkoutSlice.reducer