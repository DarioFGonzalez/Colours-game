import { Link } from "react-router-dom"

export const Landing = () =>
{

    return(
        <main>
            Let's guess some colours!
            <Link to='/home'>
                <button> PLAY </button>
            </Link>
        </main>
    )
}