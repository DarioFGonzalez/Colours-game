import { useEffect, useState } from "react";
import Style from './Home.module.css';
import { Game } from "../Game/Game.tsx";


export const Home = () =>
{
    const [ tiempo, setTiempo ] = useState( 0 );
    const [ intervaloId, setIntervaloId ] = useState( 0 );
    const [ timer, setTimer ] = useState( false );
    

    useEffect( () =>
    {
        tiempo>=10 && detenerCronometro();
    }, [tiempo] )

    const iniciarCronometro = () =>
    {
        setTimer( true );
        let c = 0;
        let intervalo = setInterval(() =>
        {
            setTiempo( c + 1 );
            c++;
        }, 1000); // 1 segundo
      
        // Opcional: Guardar el intervalo para detenerlo más tarde
        setIntervaloId(intervalo);
    };

    const reiniciarCronometro = () =>
    {
        setTimer( false );
        setTiempo(0);
    };

    const detenerCronometro = () =>
    {
        setTimer( false );
        clearInterval(intervaloId);
        setTiempo(tiempo);
    }

    const cronometerStyle = () =>
    {
        if(tiempo==0 && timer==false)
        {
            return Style.static;
        }
        else
        {
            if(tiempo==10)
            {
                return Style.done;
            }
            else
            {
                if(timer)
                {
                    return Style.running;
                }
                else
                {
                    return Style.paused;
                }
            }
        }
    }

    return(
        <main>

            <h1 className={cronometerStyle()}> Tiempo: {tiempo} </h1>

            <Game tiempo={tiempo} reiniciarCronometro={reiniciarCronometro} detenerCronometro={detenerCronometro} iniciarCronometro={iniciarCronometro}/>

        </main>
    )
}