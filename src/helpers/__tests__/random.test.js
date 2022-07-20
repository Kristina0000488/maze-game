import * as random from '../random';


describe( 'random helpers test', ( ) => {
    it( 'get random int', ( ) => {
        const value0 = random.int( 10, 5 );
        const value1 = random.int( 15, 10 );

        expect( value0 ).toBeLessThan( 11 );
        expect( value0 ).toBeGreaterThan( 4 );

        expect( value1 ).toBeLessThan( 16 );
        expect( value1 ).toBeGreaterThan( 9 );
    } );

    it( 'choice', ( ) => {
        const value = random.choice( [ 55, 16 ] );

        expect( [ 55, 16 ].indexOf( value ) ).toBeGreaterThan( -1 );
    } );
});