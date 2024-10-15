import React, { ReactElement } from 'react';
import PlaceIcon from './PlaceIcon';

type TAmenityType = 'cafe' | 'restaurant' | 'bar';

interface IPlaceItemProps {
    amenity: TAmenityType,
    name: string,
    street: string,
    housenumber: string,
    lat: string,
    lon: string,
    id: string
};

const PlaceItem = ({
    amenity,
    name,
    street,
    housenumber,
    lat,
    lon,
    id
}: IPlaceItemProps): ReactElement => {

    const distance = 90; // hook here
    const icon = amenity === 'cafe' ? 'coffee' : amenity === 'bar' ? 'martini' : 'chef-hat';

    return (
        <div
            className='bg-stone-100 rounded-md px-3 py-2'
        >
            <div
                className='flex justify-between pb-3 border-b border-stone-200'
            >
                <div
                    className='flex gap-2 items-end'
                >
                    <h6
                        className='font-semibold text-sm text-stone-950'
                    >
                        {name}
                    </h6>
                    <p
                        className='text-xs text-stone-500'
                    >
                        {amenity}
                    </p>
                </div>
                <PlaceIcon name={icon} />
            </div>
            <div
                className='flex justify-between pt-2'
            >
                <div
                    className='flex gap-1 items-end'
                >
                    <h6
                        className='font-semibold text-sm text-stone-950'
                    >
                        {distance}
                    </h6>
                    <p
                        className='text-xs text-stone-500'
                    >
                        meters
                    </p>
                </div>
                <h6
                    className='font-regular text-sm text-stone-950'
                >
                    {street} {housenumber}
                </h6>
            </div>
        </div>
    );
};

export default PlaceItem;
