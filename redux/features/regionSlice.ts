import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import callAPI from '../../pages/api/callAPI'

export const fetchShowRegion = createAsyncThunk(
    'region/fetchShowRegion',
    async () => {
        const response = await callAPI("GET", "region/show",null, null)
        return response.data
    }
);
export const fetchShowDistrictByID = createAsyncThunk(
    'users/fetchShowDistrictByID',
    async (id: any) => {
        const response = await callAPI("GET", `district/show/${id}`,null, null)
        return response.data
    }
);
export const fetchShowWardByID = createAsyncThunk(
    'users/fetchShowWardByID',
    async (id: any) => {
        const response = await callAPI("GET", `ward/show/${id}`,null, null)
        return response.data
    }
);
export const fetchShowTemDistrictByID = createAsyncThunk(
    'users/fetchShowTemDistrictByID',
    async (id: any) => {
        const response = await callAPI("GET", `district/show/${id}`,null, null)
        return response.data
    }
);
export const fetchShowTemWardByID = createAsyncThunk(
    'users/fetchShowTemWardByID',
    async (id: any) => {
        const response = await callAPI("GET", `ward/show/${id}`,null, null)
        return response.data
    }
);

export const regionSlice = createSlice({
    name: 'region',
    initialState: { regions: [], districts: [], wards: [], temDistricts: [], temWards: [] },
    reducers: {
        increment: (state) => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShowRegion.fulfilled, (state, action) => {
            state.regions = action.payload;
        }),
            builder.addCase(fetchShowDistrictByID.fulfilled, (state, action) => {
                state.districts = action.payload;
            }),
            builder.addCase(fetchShowWardByID.fulfilled, (state, action) => {
                state.wards = action.payload;
            })
        builder.addCase(fetchShowTemDistrictByID.fulfilled, (state, action) => {
            state.temDistricts = action.payload;
        }),
            builder.addCase(fetchShowTemWardByID.fulfilled, (state, action) => {
                state.temWards = action.payload;
            })
    }
})

// Action creators are generated for each case reducer function
export const { increment } = regionSlice.actions

export default regionSlice.reducer