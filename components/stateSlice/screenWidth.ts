import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ScreenWidth {
  value: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const initialState: ScreenWidth = {
  value: 'md',
}

export const screenWidthSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    xs: (state) => { state.value = 'xs' },
    sm: (state) => { state.value = 'sm' },
    md: (state) => { state.value = 'md' },
    lg: (state) => { state.value = 'lg' },
    xl: (state) => { state.value = 'xl' },
    forceResize: (state, action: PayloadAction<ScreenWidth['value']>) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { xs, sm, md, lg, xl, forceResize } = screenWidthSlice.actions

export default screenWidthSlice.reducer