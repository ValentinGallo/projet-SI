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
            localStorage.setItem('id', response.Result);
            alert('L\'utilisateur : ' + this.state.identifiant + ' est connecté')
            this.setState({})
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
            <div>
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

export default Connexion;