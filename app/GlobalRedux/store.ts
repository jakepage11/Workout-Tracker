'use client'
import { configureStore } from "@reduxjs/toolkit";
import futureWorkoutSlice from "./Features/futureworkouts/futureworkoutsSlice";
export const store = configureStore({
  reducer: {
    futureWorkouts: futureWorkoutSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch