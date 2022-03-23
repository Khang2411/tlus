import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import callAPI from '../../pages/api/callAPI'
import type { RootState } from "../app/store"


export const fetchCv = createAsyncThunk(
    'Cv/fetch',
    async (cccd: any) => {
        const response = await callAPI("GET", `cv/${cccd}`, null, null);
        return response.data
    }
);
export const fetchUpdateCv = createAsyncThunk(
    'updateCv/fetch',
    async (dataSend:any) => {
        const response = await callAPI("POST", `cv/update`, dataSend, null);
        return response.data
    }
);


export const checkCvSlice = createSlice({
    name: 'cv',
    initialState: { check: "", update: "" },
    reducers: {
        increment: (state) => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCv.fulfilled, (state, action) => {
             state.check = action.payload

        }),
         builder.addCase(fetchUpdateCv.fulfilled, (state, action) => {
               state.update = action.payload

            })

    }
})

// Action creators are generated for each case reducer function
export const { increment } = checkCvSlice.actions

export default checkCvSlice.reducer