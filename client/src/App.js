import './App.css';

import {  Route, useLocation } from "react-router-dom"
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail';
import NavBar from './components/NavBar/NavBar';





function App() {

  const location = useLocation(); //Hook para saber la ubicacion del path
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" component={Landing}/>

      <Route path="/home"   render={() => <Home/>}/>

      <Route path="/detail">
        <Detail/>
      </Route>

      <Route exact path="/create">
        <Form/>
      </Route>

    </div>
  );
}


/*
function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
  );
}

*/
export default App;
