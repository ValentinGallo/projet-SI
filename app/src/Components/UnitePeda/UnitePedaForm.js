//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';

class UnitePedaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      identifiant: 1,
      nom: '',
      url: ''
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
    API.postUP(this.state.identifiant, this.state.nom, this.state.url)
    .catch(err => console.error(err));

    event.preventDefault();
  }
  
  render() {
    
    const { error } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else {
      return (
        <div className="container">
          <form className="container mt-5 mb-3 bg-light" onSubmit={this.handleSubmit}>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
              < input name="nom" type="text" className="form-control" value={this.state.nom} onChange={this.handleChange} />
              </div>
              <div class="col-auto">
                <input name="url" type="text" className="form-control" value={this.state.url} onChange={this.handleChange} />
              </div>
              <div class="col-auto">
                <button type="submit" className="btn btn-success">Créer une unité pédagogique</button>
              </div>
            </div>
          </form>
        </div>
        );
      }
    }
  }
  
  export default UnitePedaForm;
