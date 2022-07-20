import * as random from './random';


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


/**
 * Build maze game main logic
 * @param {Number} sizeMaze    
 * @param {Number} amountSteps 
 * @returns {{ startCell: string; finishCell: string; arrSteps: {keyCell: string; direction: keyof typeof controls[]; }[] }}
 */
export function buildMaze(sizeMaze, amountSteps)
{  
    const startCell = generateRandomCell(sizeMaze);
    const arrSteps  = generateSteps(startCell, amountSteps, sizeMaze);

    if ( arrSteps.length > 0 )
    {
        const finishCell =  arrSteps[ arrSteps.length - 1 ].keyCell;
        
        return { startCell, finishCell, arrSteps };
    }
}

/**
 * 
 * @param {number} sizeMaze 
 * @returns {string} generate random cell
 */
 export function generateRandomCell(sizeMaze) {
    const row = random.int(sizeMaze);
    const cell = random.int(sizeMaze);

    return getCell(row, cell);
}

/**
 * Format cell value via row and column ids
 * @param {Number} idRow 
 * @param {Number} idCell 
 * @returns {string} 
 */
export const getCell = (idRow, idCell) => `${ idRow }-${ idCell }`;


/**
 * Generate random way from start cell to some cell in maze
 * @param {string} startCell 
 * @param {number} amountSteps 
 * @param {number} sizeMaze 
 * @returns { number[] } 
 */
export function generateSteps(startCell = '', amountSteps, sizeMaze) {
    let arrSteps = [];
    let lastStep = { keyCell: startCell };

    for (let index = 0; index < amountSteps; index++) {
        let [idLastRow, idLastCellRow] = lastStep.keyCell.split("-");

        lastStep = getNextStep(+idLastRow, +idLastCellRow, sizeMaze, lastStep.direction);

        arrSteps.push(lastStep);
    }

    return arrSteps;
}

/**
 * Genereate next step in maze
 * @param {number} idLastRowidStartRow 
 * @param {number} idStartCellRow 
 * @param {number} sizeMaze 
 * @param {number} lastDirection 
 * @returns {{keyCell: string; direction: keyof typeof controls[]; }}
 */
export function getNextStep(idStartRow, idStartCellRow, sizeMaze, lastDirection) {
    const possibleDirections = getPossibleDirections(idStartRow, idStartCellRow, sizeMaze);
    const filteredDirections = possibleDirections.filter(item => item !== antipodes[lastDirection]);
    
    const direction = random.choice(filteredDirections);

    let idRow = idStartRow;
    let idCellRow = idStartCellRow;

    if (direction === controls.left) {
        idCellRow = idCellRow - 1;
    } else if (direction === controls.right) {
        idCellRow = idCellRow + 1;
    } else if (direction === controls.up) {
        idRow = idRow - 1;
    } else if (direction === controls.down) {
        idRow = idRow + 1;
    }

    return { keyCell: getCell(idRow, idCellRow), direction };
}

/**
 * Get posible direction in maze for move from current cell
 * @param {number} idRow 
 * @param {number} idCell 
 * @param {number} sizeMaze 
 * @returns {string[]}
 */
export function getPossibleDirections(idRow, idCell, sizeMaze) {
    const canUp = idRow !== 1;
    const canDown = idRow !== sizeMaze;
    const canRight = idCell !== sizeMaze;
    const canLeft = idCell !== 1;
    const possibleDirections = [];

    if (canUp)
        possibleDirections.push(controls.up);
    if (canDown)
        possibleDirections.push(controls.down);
    if (canRight)
        possibleDirections.push(controls.right);
    if (canLeft)
        possibleDirections.push(controls.left);

    return possibleDirections;
}