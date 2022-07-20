import React  from 'react';

import Button from '../Button';

import './style.css';


function StartMessage({ 
    value='', 
    headerText=[], 
    onSubmit, 
    onChange, 
    placeholder='',
    min='', 
    max=''
}) 
{
    const handleChange = (event) => 
    {
        onChange(Number(event.target.value));
    }
    
    const handleSubmit = (event) => 
    {
        event.preventDefault();
        onSubmit(value);
    }

    return (
        <div className='startMessage'>
            { headerText.length > 0 && headerText.map( (text, id) => {
                if ( id === 0 ) {
                    return <h2 key={ id }>{ text }</h2>
                } else {
                    return <h3 key={ id }>{ text }</h3>
                }
            } ) }            
            <form>
                <input 
                    type="number" 
                    value={ value } 
                    onChange={ handleChange } 
                    min={ min.toString() } 
                    max={ max.toString() }  
                    placeholder={ placeholder.toString() } 
                />
                <Button onClick={ handleSubmit } text='Далее' />
            </form>
        </div>
    );
}

export default StartMessage;