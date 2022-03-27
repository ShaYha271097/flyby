import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './counterSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  walletModalOpen: boolean
}

const initialState: CounterState = {
  walletModalOpen: false,
}

const ModalOpen = createSlice({
  name: 'walletModal',
  initialState,
  reducers: {
    toggleWalletModalx: (state) => {
      state.walletModalOpen = !state.walletModalOpen;
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleWalletModalx} = ModalOpen.actions



export const store = configureStore({
  reducer: ModalOpen.reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch