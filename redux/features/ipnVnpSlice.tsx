import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import callAPI from '../../pages/api/callAPI'
import callApiWithImg from '../../pages/api/callApiWithImg';
import type { RootState } from "../app/store"


export const paymentVnp = createAsyncThunk(
    'ipn/fetch',
    async (query:{}) => {
        const response = await callAPI("POST", 'vnpay_payment/ipn', query, null);
        return response.data
    }
);
export const createCV = createAsyncThunk(
    'cv/fetch',
    async (data:{}) => {
        console.log(data);
        const response = await callAPI("POST", 'cv/store',data,null);
        return response.data
    }
);

export const ipnVnpSlice = createSlice({
    name: 'vnp',
    initialState: { "code": "" },
    reducers: {
        increment: (state) => {
          
        },
    },
    extraReducers: (builder) => {
        builder.addCase(paymentVnp.fulfilled, (state, action) => {
            console.log(action.payload);
            state.code=action.payload.RspCode
            return;
        }),
        builder.addCase(createCV.fulfilled, (state, action) => {
            console.log(action.payload);
            return;
        })

    }
})

// Action creators are generated for each case reducer function
export const { increment } = ipnVnpSlice.actions

export default ipnVnpSlice.reducer