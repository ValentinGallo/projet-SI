//Rien d'intéressant ici du pur affichage html/css
import React from 'react';

class Appbar extends React.Component {  

      endSession() {
        localStorage.clear()
      }

	render() {
          if (localStorage.getItem("id") == null) {
          return <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">GRPN</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="/Connexion">Connexion</a>
            </div>
          </div>
        </nav>;
        } else {
          return (
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">GRPN</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/Profil">Profil</a>
                    <a className="nav-item nav-link active" href="/Messagerie">Messagerie</a>
                    <a className="nav-item nav-link active" href="/Utilisateur">Utilisateurs</a>
                    <a className="nav-item nav-link active" href="/ModuleFormation">ModuleFormation</a>
                    <a className="nav-item nav-link active" href="/Backup">Backup</a>
                    <a className="nav-item nav-link disable" onClick={ this.endSession } href="/">Se déconnecter</a>
                  </div>
                </div>
              </nav>
          );
        }
    }
}

export default Appbar;