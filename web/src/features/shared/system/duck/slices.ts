import { createSlice } from '@reduxjs/toolkit'

export const serviceSlice = createSlice({
  name: 'serviceForm',
  initialState: {
    data: 1
  },
  reducers: {
    get: (state: any) => { state.data = '1' }
  }
})