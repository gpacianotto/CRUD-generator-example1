import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import NewGame from './Pages/NewGame';

function App() {
  return (
    
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/new-game' element={<NewGame/>}/>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
