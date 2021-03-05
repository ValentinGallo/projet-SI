//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiUP from '../UnitePeda/ApiUP'

class ModalListUP_MF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant:1,
            unitePeda:[]
        };
    }    
    
    componentDidMount() {    
        ApiUP.afficherUP(this.state.identifiant,this.props.id_MF)
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
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        }
        export default ModalListUP_MF;