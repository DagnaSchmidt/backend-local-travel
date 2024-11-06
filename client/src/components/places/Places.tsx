'use client'
import React, { ReactElement, useEffect } from 'react';
import PlaceItem from './PlaceItem';
import { setPlaces } from '@/store/places/placesSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TPlaceItemProps } from './PlaceItem';


const Places = (): ReactElement => {
    const dispatch = useAppDispatch();
    const places = useAppSelector((state) => state.places);
    const localization = useAppSelector((state) => state.search);

    useEffect(() => {
        dispatch(setPlaces(localization));
    }, [localization]);

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
                className='flex flex-col gap-1 xl:grid xl:grid-cols-2 xl:gap-x-4'
            >
                {places?.map((i: TPlaceItemProps) => <PlaceItem key={i.id} {...i} />)}
            </div>
        </div>
    );
};

export default Places;
