//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API'
import Crypto from 'crypto'

class ModalUserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiantUser:null,
            nomRole:null,
            motDePasse:null,
            idRole:null,
            roles: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }  
    
    componentDidMount() {       
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
        this.setState({idRole:event.target.value})
      }
      
      handleSubmit(event) {
        var nouvMdp
        if(this.state.motDePasse != null && this.state.motDePasse != undefined) {
          var encrypt = Buffer.from(this.state.motDePasse)
          nouvMdp = Crypto.publicEncrypt(API.getApiKey(),encrypt).toString('base64')
        }
        else {
          nouvMdp = this.props.user.motDePasse
        }
        API.putUser(
          this.props.user.id, 
          this.state.identifiantUser != null && this.state.identifiantUser != undefined ? this.state.identifiantUser : this.props.user.identifiant,
          nouvMdp, 
          this.state.idRole != null && this.state.idRole != undefined ? this.state.idRole : this.props.user.idRole
          )
        .then(() => this.props.refresh())
        .catch(err => console.error(err));

        event.preventDefault();
      }

    render() {
            return (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-secondary text-white">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edition : {this.props.user.identifiant}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               
                            <div className="card text-white bg-dark mb-3 col-12 mx-auto">
          <div className="card-body">
            <form>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label>Identifiant:</label>
                  < input name="identifiantUser" placeholder={this.props.user.identifiant} type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="col-auto">
                  <label>Mot de passe:</label>
                  <input name="motDePasse" type="password" placeholder="********" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="col-auto">
                <label>Role :</label>
                <select defaultValue='1' className="form-select" aria-label="Default select example" onChange={this.selectChange}>
                  {this.state.roles.map(item => (
                  <option  key={item.id} value={item.id}>{item.nom}</option>))}
                </select>
                </div>
                <div className="col-auto">
                <button type="button" onClick={this.handleSubmit} data-bs-dismiss="modal" className="btn btn-warning mt-4"> <i className="fas fa-pencil-alt"/> Modifier</button>
                </div>
              </div>
            </form>
          </div>
        </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light mx-auto col-12" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        }
        export default ModalUserEdit;