import React from 'react';

import './style.css';


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