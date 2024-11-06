import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        lon: 12.4910693,
        lat: 41.8949549
    },
    reducers: {
        setReducerSearch(state, action) {
            const newState = action.payload;
            return newState;
        }
    }
});

export const { setReducerSearch } = searchSlice.actions;
export default searchSlice.reducer;
