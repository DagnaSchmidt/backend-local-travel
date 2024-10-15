import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/searchSlice';
import trafficReducer from './traffic/trafficSlice';
import transportReducer from './transport/transportSlice';
import weatherReducer from './weather/weatherSlice';
import placesReducer from './places/placesSlice';
import { useDispatch, useSelector } from 'react-redux';

export const makeStore = () => {
    return configureStore({
        reducer: {
            search: searchReducer,
            traffic: trafficReducer,
            transport: transportReducer,
            weather: weatherReducer,
            places: placesReducer
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
