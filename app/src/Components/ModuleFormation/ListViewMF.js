//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiMF from './ApiMF';
import API from '../../utils/API';
import ModalListUP_MF from './ModalListUP_MF';

class ListViewMF extends React.Component {
    constructor(props) {
        super(props);
        this.child  = React.createRef();
        this.state = {
            identifiant: parseInt(localStorage.getItem("id")),
            modulesFormation:[],
            nomMF:null,
            nom:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tabSelect = this.tabSelect.bind(this);
    }    
    
    componentDidMount() {       
        ApiMF.afficherMF()
        .then(response => response.json())
        .then(response => this.setState({modulesFormation:response}))
        .catch(err => console.error(err));
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        API.postMF(this.state.nom, this.state.identifiant)
        .then(() => this.refresh())
        .catch(err => console.error(err));
    
        this.refresh()
        event.preventDefault();
    }

    refresh() {
        ApiMF.afficherMF()
        .then(response => response.json())
        .then(response => this.setState({modulesFormation:response}))
        .catch(err => console.error(err));
    }

    deleteMF = (index,e) =>{
        const mf = Object.assign([],this.state.modulesFormation)
        mf.splice(index,1)
        this.setState({modulesFormation:mf})
        API.deleteMF(e.target.value)
    }

    tabSelect(event){
        this.setState({nomMF:event.target.name});
        this.child.current.refresh(event.target.value);
    }
    
    render() {
        const bodyTab = this.state.modulesFormation.map((element, index) => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td >
                <button onClick={this.tabSelect} value={element.id} name={element.nom} type="button" className="btn btn-secondary col-12 mx-auto" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal">{element.nom}
                </button>
            </td>
            { localStorage.getItem("nomRole") === "Admin" ? <td><button value={element.id} className="btn btn-danger fas fa-trash-alt" onClick={this.deleteMF.bind(this, index)}/></td>: <td></td>} 
            </tr>
            );
            return (
                <div>
                    <div className="mt-5 col-10 mx-auto">
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">nom</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                                <tbody>
                                {bodyTab}
                            </tbody>
                        </table>

                        { localStorage.getItem("nomRole") === "Admin" ? 
                        <div className="card text-white bg-dark mb-3 col-12 mx-auto">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row g-3 align-items-center">
                                    <div className="col-auto">
                                        <label>Nom:</label>
                                        <input name="nom" type="text" className="form-control" value={this.state.nom} onChange={this.handleChange} />
                                    </div>

                                    <div className="col-auto">
                                        <button type="submit" onClick={this.handleSubmit} className="btn btn-success mt-4">Ajouter</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> 
                        :
                        null
                        } 
                           
                    </div>                
                    <ModalListUP_MF ref={this.child} nom_MF={this.state.nomMF} />
                </div>
                );
            }
        }
export default ListViewMF;