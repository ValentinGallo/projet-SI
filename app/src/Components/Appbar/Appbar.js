//Rien d'intéressant ici du pur affichage html/css
import React from 'react';

class Appbar extends React.Component {  

      endSession() {
        localStorage.clear()
      }

	render() {
    var routeUtlisateur;
    if (localStorage.getItem("nomRole") == "Admin") {
      routeUtlisateur = <a className="nav-item nav-link active" href="/Utilisateur"><i className="fas fa-users"></i> Utilisateurs</a>;
    }
    
    var routeBackup;
    if (localStorage.getItem("nomRole") == "Admin") {
      routeBackup =  <><a className="nav-item nav-link active" href="/Backup"><i className="far fa-save"></i> Sauvegarde</a>
      <a className="nav-item nav-link active" href="/Statistiques"><i className="fas fa-signal"></i> Statistiques</a></>;
    }

          if (localStorage.getItem("id") == null) {
          return <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <a className="navbar-brand" href="/" style={{marginLeft: '1rem'}}>GRPN</a>
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
              <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{marginLeft: '1rem'}}>GRPN</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    <a className="nav-item nav-link active" href="/Messagerie"><i className="far fa-comments"></i> Messagerie</a>

                    {routeUtlisateur}

                    <a className="nav-item nav-link active" href="/ModuleFormation"><i className="fas fa-cubes"></i> Module formation</a>
                    <a className="nav-item nav-link active" href="/UnitePedagogique"><i className="fas fa-book"></i> Mes unités pédagogiques</a>

                    {routeBackup}

                  </div>
                  <div className="navbar-nav d-flex">
                        <a className="nav-item nav-link active" href="/Profil"><i className="far fa-user"></i> { localStorage.getItem("identifiant")+"("+localStorage.getItem("nomRole")+")"}</a>
                        <a className="nav-item nav-link disable" onClick={ this.endSession } href="/"><i className="fas fa-sign-out-alt"></i> Se déconnecter</a>
                    </div>
                </div>
                </div>
              </nav>
          );
        }
    }
}

export default Appbar;