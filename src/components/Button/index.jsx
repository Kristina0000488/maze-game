import React from 'react';

import './style.css';

/**
 * Button
 * @param { string } text   
 * @param { function } onClick  
 * @param { boolean } visible  
 * @returns 
 */
function Button({ text='', onClick, visible=true }) 
{
    return (
        <button 
            style={{ visibility: `${ visible ? 'visible' : 'hidden' }` }} 
            onClick={ onClick }
        >
            { text }
        </button>
    );
}

export default Button;