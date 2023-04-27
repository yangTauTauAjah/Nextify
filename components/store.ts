import { configureStore } from '@reduxjs/toolkit'
import screenWidthReducer from '@/components/stateSlice/screenWidth'
import dataReducer from './stateSlice/SpotifyAPI/data'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    screenWidth: screenWidthReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch