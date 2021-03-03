//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
//Pour utiliser l'API qui se trouve dans le dossier utils
import {neo4jurl} from '../../utils/API';

//Pour l'instant pour tester le composant : importer et le mettre dans App.js
class Backup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      neo4jbackup:neo4jurl+'/backup'
    };
  }
  
  render() {
    return (
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <h1>Backup de la base Neo4j</h1>
        <div class="text-center">
          <a type="button" class="btn btn-primary" href={this.state.neo4jbackup} download>Télécharger</a>
        </div>
      </div>
    );
  }
}
  
export default Backup;