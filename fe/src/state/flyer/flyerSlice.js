import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle',
    error: null
}


const API_URL = '/api/flyers'
const SERVER_HOST = 'http://localhost:4000'
export const getFlyers = createAsyncThunk(API_URL, async (paginationObject, thunkAPI) => {
    try {
        const res = await axios.get(`${SERVER_HOST}${API_URL}?page=${paginationObject.page}&limit=${paginationObject.limit}`)
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message })
    }
})


const flyerSlice = createSlice({
    name: 'flyer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        const { pending, fulfilled, rejected } = getFlyers;

        builder
            .addCase(pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fulfilled, (state, action) => {
                state.status = 'successful'
                state.data = action.payload
            })
            .addCase(rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default flyerSlice.reducer