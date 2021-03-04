//Rien d'intéressant ici du pur affichage html/css
import React from 'react';

class Appbar extends React.Component {  

      endSession() {
        localStorage.clear()
      }

	render() {
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
                <a className="navbar-brand" href="/" style={{marginLeft: '1rem'}}>GRPN</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/Messagerie"><i className="far fa-comments"></i> Messagerie</a>
                    <a className="nav-item nav-link active" href="/Utilisateur"><i className="fas fa-users"></i> Utilisateurs</a>
                    <a className="nav-item nav-link active" href="/ModuleFormation"><i className="fas fa-cubes"></i> ModuleFormation</a>
                    <a className="nav-item nav-link active" href="/UnitePedagogique"><i className="fas fa-book"></i> UnitePedagogique</a>
                    <a className="nav-item nav-link active" href="/Backup"><i className="far fa-save"></i> Backup</a>

                  </div>
                  <ul className="navbar-nav pull-right" style={{position: 'absolute', right: '0'}}>
                      <li className="nav-item mr-auto">
                        <a className="nav-item nav-link active" href="/Profil"><i className="far fa-user"></i> { localStorage.getItem("identifiant")+"("+localStorage.getItem("nomRole")+")"}</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-item nav-link disable" onClick={ this.endSession } href="/"><i className="fas fa-sign-out-alt"></i> Se déconnecter</a>
                      </li>
                    </ul>
                  
                </div>
              </nav>
          );
        }
    }
}

export default Appbar;