import React from 'react';

export const BrowseScreen = () => {
    return (
        <>
            <h2 className='text-8xl mb-24'>
                BrowseScreen
            </h2>
            <h1 className="italic text-xl">Go to: </h1>
            <a href='/upload' className="underline text-2xl">upload screen</a>
        </>
    );
}
