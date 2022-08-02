import React from 'react';

import './style.css';

/**
 * Wallpaper Container   
 * @param { boolean } visible
 * @param { boolean } isWin
 * @param { { children: JSX.Element } } children
 * @returns { JSX.Element }
 */
function WallpaperContainer({ visible=false, isWin=false, children }) 
{
    const renderImage = ( isWin ) => 
    {
        if ( isWin ) {
            return <div className='win_wallpaper' />;
        } else {
            return <div className='fail_wallpaper' />;
        }
    }
    return (
        <div className='wallpaper'>
            { visible && renderImage( isWin ) }
            { children }
            { visible && renderImage( isWin ) }
        </div>
    );
}

export default WallpaperContainer;