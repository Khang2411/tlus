import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import aspirationSlice from '../features/aspirationSlice'
import checkCvSlice from '../features/checkCvSlice'
import highSchoolSlice from '../features/highSchoolSlice'
import ipnVnpSlice from '../features/ipnVnpSlice'
import loginSlice from '../features/loginSlice'
import regionSlice from '../features/regionSlice'

export const store = configureStore({
  reducer: {
    region: regionSlice,
    aspirations: aspirationSlice,
    vnp: ipnVnpSlice,
    highSchool: highSchoolSlice,
    cv: checkCvSlice,
    login: loginSlice,

  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
