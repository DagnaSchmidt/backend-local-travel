'use client'
import React, { useEffect } from 'react';
import PlaceItem from './PlaceItem';
import { setPlaces } from '@/store/places/placesSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TPlaceItemProps } from './PlaceItem';


const Places = () => {
    const dispatch = useAppDispatch();
    const places = useAppSelector((state) => state.places);

    // hard coded localization, update later
    const localization = {
        "lon": "12.4910693",
        "lat": "41.8949549"
    };

    useEffect(() => {
        dispatch(setPlaces(localization));
    }, []);

    return (
        <div
            className='bg-stone-50 rounded-xl border border-stone-950 shadow p-2 flex flex-col'
        >
            <h5
                className='font-bold text-lg text-stone-950 pb-2'
            >
                Places
            </h5>
            <div
                className='flex flex-col gap-1'
            >
                {places?.map((i: TPlaceItemProps) => <PlaceItem key={i.id} {...i} />)}
            </div>
        </div>
    );
};

export default Places;
