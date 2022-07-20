import * as engine from '../engine';


describe( "test engine", ( ) => {
    it( "build maze", ( ) => {
        const rows                                = { '1': true, '2': true, '3': true };
        const matrix                              = { '1': rows, '2': rows, '3': rows };
        const { arrSteps, startCell, finishCell } = engine.buildMaze( 3, 8 );
      
        expect( arrSteps.length ).toEqual( 8 );
        
        const [ startRow, startCol ] = startCell.split( "-" );
        const [ endRow  , endCol   ] = finishCell.split( "-" );
        
        expect( matrix[startRow] ).toBeTruthy();
        expect( matrix[endRow]   ).toBeTruthy();

        expect( matrix[startRow][startCol] ).toBe(true);
        expect( matrix[startRow][endCol]   ).toBe(true);

        let row = +startRow;
        let col = +startCol;

        for ( let i=0; i < arrSteps.length; i++ )
        {
            const step = arrSteps[i].direction;

            if ( step === 'up' )
            {
                row--;
            } else if ( step === 'down' ) {
                row++;
            } else if ( step === 'left' ) {
                col--;
            } else {
                col++;
            }

            expect( matrix[`${row}`][`${col}`] ).toBe(true);
        }

        expect( engine.getCell( row, col ) ).toBe( finishCell );
    });

    it( 'get cell', ( ) => {
        expect( engine.getCell( 2,4 ) ).toBe( '2-4' );
    });

    it( 'generate random cell', ( ) => {
        const [ row, col ] = engine.generateRandomCell( 8 ).split( '-' );
        
        expect( +col ).toBeGreaterThan( 0 );
        expect( +row ).toBeGreaterThan( 0 );
        expect( +row ).toBeLessThan( 9 );
        expect( +col ).toBeLessThan( 9 );
    });
});