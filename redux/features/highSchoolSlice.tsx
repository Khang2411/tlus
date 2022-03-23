import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchHighSchool =  createAsyncThunk(
    'highSchool/fetch',
    async () => {
        const response = await axios.get('http://tuyensinhapi.hiu.vn/api/v1.0/truongthpts');
        return response.data
    }
);

export const highSchoolSlice = createSlice({
    name: 'highSchool',
    initialState: [],
    reducers: {
        increment: (state) => {
          
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHighSchool.fulfilled, (state, action) => {
           return state=action.payload
            
        })

    }
})

// Action creators are generated for each case reducer function
export const { increment } = highSchoolSlice.actions

export default highSchoolSlice.reducer