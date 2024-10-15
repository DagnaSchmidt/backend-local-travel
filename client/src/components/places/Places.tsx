import React from 'react';
import PlaceItem from './PlaceItem';

const data = [
    {
        amenity: 'cafe',
        name: 'La Bottega del Caffè',
        street: 'Piazza della Madonna dei Monti',
        housenumber: '5',
        lat: '41.8949549',
        lon: '12.4910693',
        id: '500129236'
    },
    {
        amenity: 'restaurant',
        name: 'La Bottega del Caffè',
        street: 'Piazza della Madonna dei Monti',
        housenumber: '5',
        lat: '41.8949549',
        lon: '12.4910693',
        id: '500129236'
    }
];

const Places = () => {
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
                {data.map(i => <PlaceItem key={i.id} {...i} />)}
            </div>
        </div>
    );
};

export default Places;
