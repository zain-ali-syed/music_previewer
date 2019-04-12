import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div className="valign-wrapper" style={{width:'100%', height:'60vh'}}>
            <div style={{margin:'0 auto'}}><ReactLoading color="#000" type="spin" /></div>
        </div>
    );
};

export default Loader;