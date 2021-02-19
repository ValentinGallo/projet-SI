//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../utils/API';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      identifiant: '',
      motDePasse: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  
  componentDidMount() {       
    API.afficherUsers()
    .then(response => response.json())
    .then(response => this.setState({isLoaded: true, items: response}))
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
        <ul>
        {items.map(item => (
          <li key={item.id}>
          {item.id} {item.identifiant} {item.motDePasse} {item.idRole}
          </li>
          ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
          <label>
          Identifiant :
          <input name="identifiant" type="text" value={this.state.identifiant} onChange={this.handleChange} />
          </label>
          <label>
          Mot De Passe :
          <input name="motDePasse" type="text" value={this.state.motDePasse} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Envoyer" />
          </form>
          </div>
          );
        }
      }
    }
    
    export default Home;