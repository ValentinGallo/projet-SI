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
            <div>
              <h1>Backup de la base Neo4j</h1>
              <a type="button" class="btn btn-primary" href={this.state.neo4jbackup} download>Télécharger</a>
            </div>
          );
        }
      }

export default Backup;