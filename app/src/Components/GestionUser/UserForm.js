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
      roles:[],
      idRole:1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);

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

  selectChange(event){
    const valueSelectedByUser = parseInt(event.target.value);
    this.setState({idRole: valueSelectedByUser });
  }
  
  handleSubmit(event) {
    API.postUser(this.state.identifiant, this.state.motDePasse, this.state.idRole)
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
        <form className="container mt-5 mb-3 bg-light" onSubmit={this.handleSubmit}>

        <div className="col-auto">
        Identifiant :
        <input name="identifiant" className="form-control" type="text" value={this.state.identifiant} onChange={this.handleChange} />
        </div>

        <div className="col-auto">
        Mot De Passe :
        <input className="form-control" name="motDePasse" type="text" value={this.state.motDePasse} onChange={this.handleChange} />
        </div>

        <div className="col-auto mt-3">
        <select className="form-select" aria-label="Default select example" onChange={this.selectChange}>
          {this.state.roles.map(item => (<option  key={item.id} value={item.id}>{item.nom}</option>))}
        </select>
        </div>
        <button type="submit" className="btn btn-success mt-2">Ajouter</button>
        </form>
        </div>
        );
      }
    }
  }
  
  export default UserForm;