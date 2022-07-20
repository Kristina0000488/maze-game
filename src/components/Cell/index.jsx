import React, { useState } from 'react';

import './style.css';


function Cell({ isStart=false, isFinish=false, onClick, isEndGame=false, endRenderSteps=false }) 
{
    const [ isDown, setIsDown ] = useState(false);

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