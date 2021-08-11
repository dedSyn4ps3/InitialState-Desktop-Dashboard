import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>[+] Loading... [+]</div>;
    }

    const src = source;
    return (
        // basic bootstrap classes. you can change with yours.
        <div className="emdeb-responsive embed-responsive-16by9">
            <iframe src={src} height={700} width={1000}/>
        </div>
    );
};

export default Iframe;