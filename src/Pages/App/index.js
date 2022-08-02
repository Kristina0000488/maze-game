import React, { useState }          from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Maze         from '../../components/Maze';
import StartMessage from '../../components/StartMessage';

import {
  selectMinMax,
  selectHeaderStartText,
  selectAmountSteps,
  selectAmountCells,
  setAmountCells,
  setAmountCellsStart
} from '../../store/slices';

import './style.css';

/*
  * The main page. Game setup and launch.
*/
function App() 
{
  const { min, max }    = useSelector(selectMinMax);
  const headerStartText = useSelector(selectHeaderStartText);
  const amountSteps     = useSelector(selectAmountSteps);
  const amountCells     = useSelector(selectAmountCells);

  const dispatch = useDispatch();

  const [ start, setStart ] = useState(false);
  
  return (
    <div className="app">
        { 
          !start ? <StartMessage 
            value={ amountCells } 
            headerText={ headerStartText } 
            onSubmit={ () => setStart(true) } 
            onChange={ (value) => dispatch( setAmountCells(value) ) }
            min={ min }
            max={ max }
            placeholder='Количество ячеек'
          /> : <Maze 
            size={ amountCells } 
            amountSteps={ amountSteps } 
            key="0" 
            startNewGame={ () => {
              dispatch( setAmountCellsStart() );
              setStart(false);
            } } 
          /> 
        }
    </div>
  );
}

export default App;
