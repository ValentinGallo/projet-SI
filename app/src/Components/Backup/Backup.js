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
      <div className="card bg-dark">
      <div className="card-body">
      <h2 className="card-title text-center text-white">Sauvegardes des bases de données</h2>
      <div className="d-grid gap-2">
      <a type="button" className="btn btn-light mb-2" href={this.state.neo4jbackup} download>Télécharger backup Neo4j</a>
      <a type="button" className="btn btn-light mb-2" href="http://obiwan2.univ-brest.fr:7033/message" download>Télécharger backup mongoDB</a>
      <a type="button" className="btn btn-light disabled" download>Télécharger backup mariaDB</a>
      </div>
      </div>
      </div>
      </div>
      );
    }
  }
  
  export default Backup;