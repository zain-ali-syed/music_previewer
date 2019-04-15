import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import './index.css';

const Layout = ({children}) => {
    return (
        <div>
            <Nav />
                {children}
            <Footer />
        </div>
    );
};

export default Layout;