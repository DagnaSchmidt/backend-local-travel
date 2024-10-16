import React from 'react';

const Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div
            className='px-4 py-10 md:px-8 xl:px-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-x-4 gap-y-4 w-full max-w-[1320px] xl:mx-auto'
        >
            {children}
            {/* Dagna LAYOUT COMPONENT */}
        </div>
    );
};

export default Layout;
