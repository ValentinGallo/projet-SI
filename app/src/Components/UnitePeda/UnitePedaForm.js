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
      url: '',
      niveauxForma:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }    
  
  componentDidMount() {       
    API.loadNF()
    .then(response => response.json())
    .then(response => this.setState({niveauxForma:response}))
    .catch(err => console.error(err));
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
        <div className="card text-white bg-dark mb-3 col-6 mx-auto">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label>nom:</label>
                  < input name="nom" type="text" className="form-control" value={this.state.nom} onChange={this.handleChange} />
                </div>
                <div className="col-auto">
                  <label>url:</label>
                  <input name="url" type="text" className="form-control" value={this.state.url} onChange={this.handleChange} />
                </div>
                <div className="col-auto">
                <label>niveau formation :</label>
                <select className="form-select" aria-label="Default select example" onChange={this.selectChange}>
                  {this.state.niveauxForma.map(item => (<option  key={item.id} value={item.id}>{item.nom}</option>))}
                </select>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-success mt-4">Créer une unité pédagogique</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        );
      }
    }
  }
  
  export default UnitePedaForm;
  