import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Appbar from './Components/Appbar/Appbar'

//L'import comme ci dessous
//Et on met  <Route path="/maRoute" component={LeNomDuComposantDuImport}/>
import Connexion from './Components/Connexion/Connexion'
import Home from './Components/Home/Home'
import Messagerie from './Components/messagerie/Messagerie.js'
import GestionUser from './Components/GestionUser/GestionUserPage.js'
import Backup from './Components/Backup/Backup.js'
import GestionModule from './Components/ModuleFormation/GestionModule';
import GestionUP from './Components/UnitePeda/GestionUP';
import Profil from './Components/Profil/Profil';
import Statistiques from './Components/Statistiques/Statistiques';

var routeUtlisateur;
if (localStorage.getItem("nomRole") == "Admin") {
  routeUtlisateur = <Route path="/Utilisateur" component={GestionUser}/>;
}

var routeBackup;
if (localStorage.getItem("nomRole") == "Admin") {
  routeBackup =  <Route path="/Backup" component={Backup}/>;
}

const App = () => (
  <Router>
    <Appbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Connexion" component={Connexion}/>
        <Route path="/Profil" component={Profil}/>
        <Route path="/Messagerie" component={Messagerie}/>
        <Route path="/ModuleFormation" component={GestionModule}/>
        <Route path="/UnitePedagogique" component={GestionUP}/>
        <Route path="/Statistiques" component={Statistiques}/>
        {routeUtlisateur}
        {routeBackup}
      </Switch>
  </Router>
);

export default App;
