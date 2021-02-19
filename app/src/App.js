import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Appbar from './Components/Appbar/Appbar'

//L'import comme ci dessous
//Et on met  <Route path="/maRoute" component={LeNomDuComposantDuImport}/>
import Connexion from './Components/Connexion/Connexion'
import Home from './Components/Home/Home'

const App = () => (
  <Router>
    <Appbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Connexion" component={Connexion}/>
      </Switch>
  </Router>
);

export default App;
