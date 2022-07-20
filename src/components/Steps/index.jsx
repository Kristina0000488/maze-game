import React, { useEffect, useState } from 'react';

import './style.css';


function Steps({ stepsDirections, onEndRenderSteps }) 
{ 
    const [ itemsRendered, setItemsRendered ] = useState({});

    useEffect( () => {
        const directions = stepsDirections || [];
        const interval   = 500;

        directions.map( (_, id) => {
            return setTimeout( async ( ) => {
                setItemsRendered( (previous) => ({ ...previous, [id]: true } ) );
            }, interval * (id+1) );
        } );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    useEffect( () => {
        if ( itemsRendered[stepsDirections.length - 1] ) 
        {   
            onEndRenderSteps();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ itemsRendered ] );
    
    return (
        <div className='steps'>
            { !!stepsDirections && stepsDirections.map( (direction, id) => {
                return <div 
                    className='step'
                    key={ id } 
                    style={{ visibility: itemsRendered[id] ? 'visible' : 'hidden' }}
                >
                    <div className={ direction } />
                </div>
            } ) }
        </div>
    );
}

export default Steps;