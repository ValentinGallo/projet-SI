//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';
import ApiUP from './ApiUP';

class UnitePedaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      identifiant: parseInt(localStorage.getItem("id")),
      nom: '',
      url: '',
      id_nf: 0,
      niveauxForma:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refresh = this.refresh.bind(this);

  }    
  
  componentDidMount() {       
    this.refresh();
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  refresh(id_NF){
    API.loadNF()
    .then(response => response.json())
    .then(response => this.setState({niveauxForma:response,id_nf:id_NF}))
    .catch(err => console.error(err));
  }

  selectChange(event){
    this.setState({id_nf:parseInt(event.target.value)})
  }
  
  handleSubmit(event) {
    var idmf = parseInt(this.state.id_mf)
    ApiUP.updateUP(this.state.id_nf,this.state.nom,this.state.url)
    .catch(err => console.error(err));
    event.preventDefault();
    this.refresh();
  }
  
  render() {
    const { error } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else {
      return (
        <div className="card text-white bg-dark mb-3 col-12 mx-auto">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label>nom:</label>
                  < input name="nom" type="text" className="form-control" placeholder={this.state.nom} value={this.state.nom} onChange={this.handleChange} />
                </div>
                <div className="col-auto">
                  <label>url:</label>
                  <input name="url" type="text" className="form-control" placeholder={this.state.ulr} value={this.state.url} onChange={this.handleChange} />
                </div>
                <div className="col-auto">
                <label>niveau formation :</label>
                <select className="form-select" aria-label="Default select example" onChange={this.selectChange}>
                  {this.state.niveauxForma.map(item => (<option  key={item.id} name="id_nf" value={item.id}>{item.nom}</option>))}
                </select>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-warning mt-4"> <i class="fas fa-pencil-alt"/> Modifier</button>
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
  