import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        lon: 12.4910693,
        lat: 41.8949549
    },
    reducers: {

    }
});

export const { } = searchSlice.actions;
export default searchSlice.reducer;
