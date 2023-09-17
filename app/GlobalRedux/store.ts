'use client'
import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "./Features/futureworkouts/futureworkoutsSlice";
export const store = configureStore({
  reducer: {
    futureWorkouts: workoutSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch