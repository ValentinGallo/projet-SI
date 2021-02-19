//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      identifiant: '',
      motDePasse: '',
      roles:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  
  componentDidMount() {       
    API.afficherUsers()
    .then(response => response.json())
    .then(response => this.setState({isLoaded: true, items: response}))
    .catch(err => console.error(err));
    
    API.afficherRoles()
    .then(response => response.json())
    .then(response => this.setState({roles: response}))
    .catch(err => console.error(err));
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    API.postUser(this.state.identifiant, this.state.motDePasse)
    .then(response => response.json())
    .then(response => alert('L\'utilisateur : ' + this.state.identifiant + ' a été enregistré, réponse du serveur : '+response))
    .catch(err => console.error(err));
    
    event.preventDefault();
  }
  
  render() {
    
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="container">
        <form className="contenair mt-5 mb-3" onSubmit={this.handleSubmit}>

        <label  class="form-label">
        Identifiant :
        <input name="identifiant" class="form-control" type="text" value={this.state.identifiant} onChange={this.handleChange} />
        </label>

        <label  class="form-label">
        Mot De Passe :
        <input class="form-control" name="motDePasse" type="text" value={this.state.motDePasse} onChange={this.handleChange} />
        </label>

        <select class="form-select" aria-label="Default select example">
        {this.state.roles.map(item => (<option value={item.id}>{item.nom}</option>))}
        </select>
        <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
        </div>
        );
      }
    }
  }
  
  export default UserForm;