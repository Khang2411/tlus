import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import callAPI from '../../pages/api/callAPI'


export const fetchLogin = createAsyncThunk(
    'login/fetch',
    async (data:any) => {
        const response = await callAPI("POST", "auth/login", data, null)
        return response.data
    }
);
export const fetchJWT = createAsyncThunk(
    'JWT/fetch',
    async (access_token:string) => {
        const response = await callAPI("POST", "auth/me", null, `Bearer ${access_token} `)
        return response.data
    }
);
export const fetchLogout = createAsyncThunk(
    'logout/fetch',
    async (access_token:string) => {
        const response = await callAPI("POST", "auth/logout", null, `Bearer ${access_token} `)
        return response.data
    }
);
export const loginSlice = createSlice({
    name: 'login',
    initialState: { access_token: "", data: "" },
    reducers: {
        increment: (state) => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
             state.access_token=action.payload.token
             return;
        }),
        builder.addCase(fetchJWT.fulfilled, (state, action) => {
             state.data=action.payload
             return;
        }),
        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.data=""
            return;
       })
    }
})

// Action creators are generated for each case reducer function
export const { increment } = loginSlice.actions

export default loginSlice.reducer