const controls = {
    'up': 'up',
    'down': 'down',
    'left': 'left',
    'right': 'right',
};

const antipodes = {
    [ controls.up    ]: controls.down,
    [ controls.down  ]: controls.up,
    [ controls.left  ]: controls.right,
    [ controls.right ]: controls.left,
};

const getRandomInt = (max, min=1) =>
{ 
    return Math.floor( Math.random() * max ) + min;
}

export const buildMaze = (sizeMaze, amountSteps) =>
{  
    const startCell = getKeyCell(sizeMaze);
    const arrSteps  = getSteps(startCell, amountSteps, sizeMaze);

    if ( arrSteps.length > 0 )
    {
        const finishCell =  arrSteps[ arrSteps.length - 1 ].keyCell;
        
        return { startCell, finishCell, arrSteps };
    }
}

const getKeyCell = (sizeMaze) =>
{
    const row  = getRandomInt(sizeMaze);
    const cell = getRandomInt(sizeMaze);
    
    return getKey(row, cell);
}

export const getKey = (idRow, idCell) => 
{
    return `${ idRow }-${ idCell }`;
}

const getSteps = (startCell='', amountSteps, sizeMaze) =>
{
    let arrSteps = [ ];
    let lastStep = { keyCell: startCell };

    for (let index = 0; index < amountSteps; index++) 
    {
        let [ idLastRow, idLastCellRow ] = lastStep.keyCell.split( "-" );
       
        lastStep = getNextStep( +idLastRow, +idLastCellRow, sizeMaze, lastStep.direction );
    
        arrSteps.push(lastStep);        
    }

    return arrSteps;
}

const getNextStep = (idStartRow, idStartCellRow, sizeMaze, lastDirection) =>
{
    const possibleDirections = getPossibleDirections( idStartRow, idStartCellRow, sizeMaze );
    const filteredDirections = filterSameValue( possibleDirections, antipodes[ lastDirection ] );

    const direction = choice( filteredDirections );
   
    let idRow     = idStartRow;
    let idCellRow = idStartCellRow;

    if ( direction === controls.left ) {
        idCellRow = idCellRow - 1;
    } else if ( direction === controls.right ) {
        idCellRow = idCellRow + 1;
    } else if ( direction === controls.up ) {
        idRow = idRow - 1;
    } else if ( direction === controls.down ) {
        idRow = idRow + 1;
    }
    
    return { keyCell: getKey(idRow, idCellRow), direction };
}

const filterSameValue = ( arr, verificationKey ) => 
{
    return arr.filter( item => item !== verificationKey );
}

const choice = ( arr ) => 
{
    return arr[ getRandomInt( arr.length, 0 ) ];
}

const getPossibleDirections = (idRow, idCell, sizeMaze) =>
{ 
    const canUp              = idRow  !== 1;
    const canDown            = idRow  !== sizeMaze;
    const canRight           = idCell !== sizeMaze;
    const canLeft            = idCell !== 1;
    const possibleDirections = [ ];

    if ( canUp    ) possibleDirections.push( controls.up    );
    if ( canDown  ) possibleDirections.push( controls.down  );
    if ( canRight ) possibleDirections.push( controls.right );
    if ( canLeft  ) possibleDirections.push( controls.left  );
      
    return possibleDirections;
}