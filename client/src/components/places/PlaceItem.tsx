import React, { ReactElement } from 'react';
import PlaceIcon from './PlaceIcon';

type TAmenityType = 'cafe' | 'restaurant' | 'bar';

interface IPlaceItemProps {
    lat: number,
    lon: number,
    id: number,
    tags: {
        name: string,
        amenity: TAmenityType
        'addr:street': string
        'addr:housenumber': string
    }
};

const PlaceItem = ({
    lat,
    lon,
    id,
    tags
}: IPlaceItemProps): ReactElement => {

    const distance = 90; // hook here
    const icon = tags?.amenity === 'cafe' ? 'coffee' : tags?.amenity === 'bar' ? 'martini' : 'chef-hat';

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
                        {tags.name}
                    </h6>
                    <p
                        className='text-xs text-stone-500'
                    >
                        {tags.amenity}
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
                    {tags['addr:street']} {tags['addr:housenumber']}
                </h6>
            </div>
        </div>
    );
};

export default PlaceItem;
