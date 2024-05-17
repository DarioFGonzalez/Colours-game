import marron from '../../assets/marron.png';
import celeste from '../../assets/celeste.png';
import rojo from '../../assets/rojo.png';
import azul from '../../assets/azul.png';
import verde from '../../assets/verde.png';
import amarillo from '../../assets/amarillo.png';
import React, { useEffect, useState } from 'react';
import Style from './Game.module.css';

interface RelojProps
{
    tiempo: number;
    reiniciarCronometro: () => void;
    detenerCronometro: () => void;
    iniciarCronometro: () => void;
}

export const Game: React.FC<RelojProps> = ( { tiempo, reiniciarCronometro, detenerCronometro, iniciarCronometro } ) =>
{
    const [ selected, setSelected ] = useState( [ {name: '' , img: ''}, {name: '' , img: ''} ] );
    const [ correctAnswer, setCorrectAnswer ] = useState( 0 );
    const [ score, setScore ] = useState( 0 );
    const [ done, setDone ] = useState( false );
    const [ result, setResult ] = useState( 'awaiting' );
    const [ textColour, setTextColour ] = useState( Style.rojo );
    const Colours =
    [
        { name: 'Marrón', img: marron },
        { name: 'Celeste', img: celeste },
        { name: 'Rojo', img: rojo },
        { name: 'Azul', img: azul },
        { name: 'Verde', img: verde },
        { name: 'Amarillo', img: amarillo },
    ]

    useEffect( () =>
    {
        localStorage.getItem('score')==null && localStorage.setItem( 'score', JSON.stringify(0) );
        setScore( Number( localStorage.getItem('score') ) );
    },[])

    useEffect( () =>
    {
        tiempo==10 && judgement('none');
    },[tiempo])

    const startGame = () =>
    {
        setDone(false);
        reiniciarCronometro();
        iniciarCronometro();
        let firstIndex = Math.ceil( Math.random() * 5 );
        let secondIndex = Math.ceil( Math.random() * 5 );
        while(firstIndex==secondIndex)
        {
            secondIndex = Math.ceil( Math.random() * 5 );
        }
        randomColour();
        setSelected( [ Colours[firstIndex], Colours[secondIndex] ] );
        setCorrectAnswer( Math.floor( Math.random() * 2 ) );
    }

    const randomColour = () =>
    {
        let random = Math.ceil(Math.random() * 6);
        switch(random)
        {
            case 1:
                {
                    setTextColour(Style.rojo);
                    break;
                }
            case 2:
                {
                    setTextColour(Style.amarillo);
                    break;
                }
            case 3:
                {
                    setTextColour(Style.azul);
                    break;
                }
            case 4:
                {
                    setTextColour(Style.marron);
                    break;
                }
            case 5:
                {
                    setTextColour(Style.celeste);
                    break;
                }
            case 6:
                {
                    setTextColour(Style.verde);
                    break;
                }
        }
    }

    const judgement = ( selectedOption: string ) =>
    {        
        if( selectedOption==selected[correctAnswer].name )
        {
            setScore( Number( localStorage.getItem('score') ) + 1 );
            localStorage.setItem('score', JSON.stringify( Number( localStorage.getItem('score') ) + 1 ) );
            setResult('¡Correcto!');
        }
        else
        {
            if( selectedOption=='none' )
            {
                setScore( Number( localStorage.getItem('score') ) - 1 );
                localStorage.setItem('score', JSON.stringify( Number( localStorage.getItem('score') ) - 1 ) );
                setResult('¡Te quedaste sin tiempo!');
            }
            else
            {
                setScore( Number( localStorage.getItem('score') ) - 1 );
                localStorage.setItem('score', JSON.stringify( Number( localStorage.getItem('score') ) - 1 ) );
                setResult('¡Intenta otra vez!');
            }
        }
        detenerCronometro();
        setDone(true);
    }

    return(
        <div>
            { selected[0].name=='' && <button onClick={()=> startGame()}> START! </button>}
            { selected[0].name!='' && 
            <div>
                
                <h3 className={textColour}> {selected[correctAnswer].name} </h3>
                <br/>
                {!done &&
                <>
                    <img className={Style.img} onClick={ () => judgement( selected[0].name ) } src={selected[0].img} />
                    <img className={Style.img} onClick={ () => judgement( selected[1].name ) } src={selected[1].img} />
                </>}
                {done && 
                <>
                    <h3> {result} </h3>
                    <button onClick={ () => startGame() }> Siguiente round </button>
                </>
                }

            </div>}

            <br/>
            <h3> SCORE: {score} </h3>
            
        </div>
    )
}