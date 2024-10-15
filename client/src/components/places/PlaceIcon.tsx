import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IPlaceIconProps extends LucideProps {
    name: 'coffee' | 'chef-hat' | 'martini';
};

const PlaceIcon = ({
    name
}: IPlaceIconProps): ReactElement => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon strokeWidth={1} size={24} className='text-stone-700' />;
};

export default PlaceIcon;
