//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiUP from '../UnitePeda/ApiUP'
import UnitePedaForm from '../UnitePeda/UnitePedaForm';

class ModalListUP_MF extends React.Component {
    constructor(props) {
        super(props);
        this.child  = React.createRef();
        this.state = {
            identifiant:parseInt(localStorage.getItem("id")),
            unitePeda:[],
            idMF:null
        };
        this.refresh = this.refresh.bind(this);
    }    
    
    refresh(idModuleForm){
        ApiUP.afficherUP_MF(this.state.identifiant,idModuleForm)
        .then(response => response.json())
        .then(response => this.setState({unitePeda:response}))
        .then(response => this.setState({idMF:idModuleForm}))
        .then(this.child.current.refresh(idModuleForm))
        .catch(err => console.error(err));
        
        
    }

    deleteUP = (index,e) =>{
        const unites = Object.assign([],this.state.unitePeda)
        unites.splice(index,1)
        this.setState({unitePeda:unites})
        ApiUP.deleteUP(e.target.value)
    }

    render() {
        var bodyTab
        if(this.state.unitePeda.length==null){
            bodyTab = 
                <tr key="0">
                <th scope="row">-</th>
                <td >Pas d'Up dans ce module de formation</td>
                <td >-</td>
                <td ></td>
                </tr>
                
        }else{
            bodyTab = this.state.unitePeda.map((element, index) => 
                <tr key={element.id}>
                <th scope="row">{element.id}</th>
                <td >{element.nom}</td>
                <td ><a className="text-light" href={element.url}>{element.url}</a></td>
                <td><button value={element.id} className="btn btn-danger fas fa-trash-alt" onClick={this.deleteUP.bind(this, index)}/></td>
                </tr>
                );
        }
            return (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content bg-secondary text-white">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Unité pédagogique : {this.props.nom_MF}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped table-dark col-6">
                                    <thead>
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">nom</th>
                                            <th scope="col">URL</th>
                                            <th scope="col"/>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bodyTab}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                            <UnitePedaForm refresh={this.refresh} ref={this.child}/>
                                <button type="button" className="btn btn-light mx-auto col-12" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        }
        export default ModalListUP_MF;