//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';

//PAS FINI

class Connexion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiant: '',
      motDePasse: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    API.checkUser(this.state.identifiant, this.state.motDePasse)
    .then(response => response.json())
    .then(response => {
      if(response.Result !== false && response.Result !== null && response.Result !== undefined)  {
        localStorage.setItem('id', response.id);
        localStorage.setItem('nomRole', response.nomRole);
        localStorage.setItem('identifiant', response.identifiant);
        this.props.history.push("/");
        window.location.reload(true);
      }
      else {
        alert('ALERTE, C\'EST PAS LE BON MDP')
      }
    })
    .catch(err => console.error(err));
    
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="container">
      <div className="card" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',width: '20rem'}}>
      <div className="card-body">
      <h5 className="card-title text-center">Connexion</h5>
      <form onSubmit={this.handleSubmit}>
      <div className="form-group mb-3">
      <label >Identifiant</label>
      <input className="form-control " name="identifiant" type="text" value={this.state.identifiant} onChange={this.handleChange} />
      </div>
      <div className="form-group mb-3">
      <label >Mot De Passe</label>
      <input className="form-control" name="motDePasse" type="text" value={this.state.motDePasse} onChange={this.handleChange} />
      </div>
      <div className="text-center">
      <input className="btn btn-primary" type="submit" value="Se connecter" />
      </div>
      </form>
      </div>
      </div>
      </div>
      );
    }
  }
  
  export default Connexion;