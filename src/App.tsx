import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home.tsx";
import { Landing } from "./Landing/Landing.tsx";

function App()
{
  return (
    <Routes>
      <Route path='/' element={ <Landing /> } />
      <Route path='/home' element={ <Home /> } />
    </Routes>
  );
}

export default App;
