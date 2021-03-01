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
            <a href={this.state.neo4jbackup} download>Click to download</a>
          );
        }
      }

export default Backup;