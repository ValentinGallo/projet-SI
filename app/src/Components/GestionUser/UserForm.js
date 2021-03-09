//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';
import Crypto from 'crypto';

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
      idRole:1,
      users: this.props.users
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
    this.setState({idRole:event.target.value});
  }
  
  handleSubmit(event) {
    var encrypt = Buffer.from(this.state.motDePasse)
    var mdp = Crypto.publicEncrypt(API.getApiKey(),encrypt).toString('base64')

    API.postUser(this.state.identifiant, mdp, this.state.idRole)
    .then(() => this.props.refresh())
    .catch(err => console.error(err));

    this.props.refresh()
    
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
        <div className="card text-white bg-dark mb-3 mx-auto mt-5 col-md-6" >
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>

            <div className="col-auto">
            Identifiant :
            <input name="identifiant" className="form-control" type="text" value={this.state.identifiant} onChange={this.handleChange} />
            </div>

            <div className="col-auto">
            Mot De Passe :
            <input className="form-control" name="motDePasse" type="password" value={this.state.motDePasse} onChange={this.handleChange} />
            </div>

            <div className="col-auto mt-3">
            <select className="form-select" aria-label="Default select example" onChange={this.selectChange}>
              {this.state.roles.map(item => (<option  key={item.id} value={item.id}>{item.nom}</option>))}
            </select>
            </div>
            <button type="button" onClick={this.handleSubmit} className="btn btn-success mt-2">Ajouter</button>
            </form>
          </div>
        </div>
        );
      }
    }
  }
  
  export default UserForm;