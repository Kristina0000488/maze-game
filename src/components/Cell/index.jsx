import React, { useState } from 'react';

import './style.css';

/**
 * Cell of range 
 * @param { boolean } isStart   
 * @param { boolean } isFinish  
 * @param { function } onClick  
 * @param { boolean } isEndGame 
 * @param { boolean } endRenderSteps 
 * @returns { JSX.Element }
 */
function Cell({ isStart=false, isFinish=false, onClick, isEndGame=false, endRenderSteps=false }) 
{
    const [ isDown, setIsDown ] = useState(false);
    // style of cell. It depends of a status of the game.
    const style = `${ 
        ( isDown && !isStart && !isFinish ) ? 'downCell' :
        ( isFinish && !isEndGame && isStart ) ? 'startCell' : 
        ( isFinish && isEndGame && isStart ) ? 'finishCell' :
        ( isFinish && isEndGame && !isStart ) ? 'finishCell' :
        isStart ? 'startCell' : 'cell' 
    }`; 

    return (
        <div 
            className={ style } 
            onClick={ _ => {
                if ( !isEndGame && endRenderSteps )
                {
                    setIsDown(true);
                    onClick( isFinish );
                }
            } } 
        />
    );
}

export default Cell;