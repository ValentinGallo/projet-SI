//Rien d'intéressant ici du pur affichage html/css
import React from 'react';

class Home extends React.Component {
  
  render() {
    if (localStorage.getItem("id") == null) {
      return (
        <div className="container">
        <h1 className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        Bienvenue sur
        <small className="text-muted"> GRPN</small>
        </h1>
        </div>
        );
      }
      else {
        return (
          <div className="container">
          <div className="alert alert-success" role="alert">Bienvenue <b>{localStorage.getItem("identifiant")}</b> sur le site GRPN
          </div>
          <h1 className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          Bienvenue sur
          <small className="text-muted"> GRPN</small>
          </h1>
          </div>
        )
      }
        
        
      }
    }
    
    export default Home;