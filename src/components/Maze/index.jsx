import React, { 
    useState, 
    useEffect
} from 'react';

import { 
    buildMaze, 
    getCell 
} from '../../helpers/engine';

import Cell               from '../Cell';
import WallpaperContainer from '../WallpaperContainer';
import Button             from '../Button';
import Steps              from '../Steps';

import './style.css';


function Maze({ amountSteps=0, size=0, startNewGame }) 
{
    const [ startCell,      setStartCell      ] = useState( null  );
    const [ finishCell,     setFinishCell     ] = useState( null  );
    const [ arrDirections,  setArrDirections  ] = useState( [ ]   );
    const [ endGame,        setEndGame        ] = useState( false );
    const [ endRenderSteps, setEndRenderSteps ] = useState( false );
    const [ isWin,          setIsWin          ] = useState( false );

    useEffect( () => {        
        const { startCell, finishCell, arrSteps } = buildMaze(size, amountSteps);
        
        setStartCell(startCell);
        setFinishCell(finishCell);
        setArrDirections( arrSteps.map( step => step.direction ) );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );
    
    const renderRows = (size) => 
    {
        const rows = [];

        for (let index = 1; index <= size; index++) 
        {
            rows.push( <div className="row" key={ index }>
                { renderCells(size, index) }
            </div> );           
        }

        return rows;
    }

    const renderCells = (size, idRow) => 
    {
        const cells = [];

        for (let index = 1; index <= size; index++) 
        {
            const key = getCell(idRow, index);         

            cells.push( <Cell 
                key={ key } 
                isStart={ key === startCell } 
                isFinish={ key === finishCell }
                isEndGame={ endGame }
                endRenderSteps={ endRenderSteps }
                onClick={ (isWin) => {
                    setEndGame( true );
                    setIsWin( isWin );
                } }
            /> );          
        }

        return cells;
    }

    return (
        <WallpaperContainer 
            visible={ endGame } 
            isWin={ isWin } 
        >
            <div className='maze'>
                <div className='rows_maze'>
                    { renderRows(size) }
                </div>
                <div className='steps_maze'>
                    { arrDirections.length > 0 && <Steps 
                        stepsDirections={ arrDirections } 
                        onEndRenderSteps={ _ => setEndRenderSteps( true ) } 
                    /> }
                </div>
                { <Button 
                    visible={ endGame } 
                    onClick={ () => startNewGame() } 
                    text='Новая игра' 
                /> }
            </div>
        </WallpaperContainer>
    );
}

export default Maze;