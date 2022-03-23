import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import callAPI from '../../pages/api/callAPI'

export const fetchShowAspiration = createAsyncThunk(
    'aspiration/fetch',
    async () => {
        const response = await callAPI("GET", "aspirations/show", null, null)
        return response.data
    }
);
export const fetchShowSubjectsById = createAsyncThunk(
    'subjectsById/fetch',
    async (id: number) => {
        const response = await callAPI("GET", `combinate-subjects/show/${id}`, null, null)
        return response.data
    }
);


export const aspirationSlice = createSlice({
    name: 'aspirations',
    initialState: { aspiration: [], subjects: [] },
    reducers: {
        increment: (state) => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShowAspiration.fulfilled, (state, action) => {
            state.aspiration = action.payload;
        }),
            builder.addCase(fetchShowSubjectsById.fulfilled, (state, action) => {
                state.subjects = action.payload;
            })
    }
})

// Action creators are generated for each case reducer function
export const { increment } = aspirationSlice.actions

export default aspirationSlice.reducer