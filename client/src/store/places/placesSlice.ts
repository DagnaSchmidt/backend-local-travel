import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { getPlaces } from '../../services/places.js';

const placesSlice = createSlice({
    name: 'places',
    initialState: [],
    reducers: {
        setReducerPlaces(state, action) {
            const newState = action.payload;
            return newState;
        }
    }
});

type TLocalizationProps = {
    lon: number,
    lat: number
};

export const setPlaces = (data: TLocalizationProps) => {
    return async (dispatch: Dispatch) => {
        const newPlaces = await getPlaces(data);
        dispatch(setReducerPlaces(newPlaces));
    };
};

export const { setReducerPlaces } = placesSlice.actions;
export default placesSlice.reducer;
