/**
 * Get a random int in a diaposon
 * @param {Number} max 
 * @param {Number} min 
 * @returns {Number}
 */
export function int(max, min=1)
{ 
    if ( max < min ) // Для исправления, если max меньше, чем min
    {
        let tmp = max;
        max = min;
        min = tmp; 
    }

    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Choice a random element from an array
 * @param {T[]} arr array with some values 
 * @returns {T} random choiced value from arr
 * @template T   
 */
export function choice( arr )
{
    return arr[ int( arr.length, 0 ) ];
}
