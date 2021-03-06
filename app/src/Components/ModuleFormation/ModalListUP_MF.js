//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiUP from '../UnitePeda/ApiUP'
import UnitePedaForm from '../UnitePeda/UnitePedaForm';

class ModalListUP_MF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant:parseInt(localStorage.getItem("id")),
            unitePeda:[]
        };
    }    
    
    componentDidMount() {    
        ApiUP.afficherUP(this.state.identifiant)
        .then(response => response.json())
        .then(response => this.setState({unitePeda:response}))
        .catch(err => console.error(err));
    }
    
    render() {
        const bodyTab = this.state.unitePeda.map(element => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td >{element.nom}</td>
            <td >{element.url}</td>
            </tr>
            );
            
          
            return (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-secondary text-white">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Unité pédagogique : "{this.props.nom_MF}"</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">nom</th>
                                            <th scope="col">URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bodyTab}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                            <UnitePedaForm/>
                                <button type="button" className="btn btn-light mx-auto col-12" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        }
        export default ModalListUP_MF;