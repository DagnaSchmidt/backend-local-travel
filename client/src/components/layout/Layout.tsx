import React from 'react';

const Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            {children}
            {/* Dagna LAYOUT COMPONENT */}
        </div>
    );
};

export default Layout;
