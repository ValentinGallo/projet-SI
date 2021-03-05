//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiMF from './ApiMF';
import ModalListUP_MF from './ModalListUP_MF';

class ListViewMF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant: parseInt(localStorage.getItem("id")),
            modulesFormation:[],
            idMF:null
        };
        this.tabSelect = this.tabSelect.bind(this);
    }    
    
    componentDidMount() {       
        ApiMF.afficherMF()
        .then(response => response.json())
        .then(response => this.setState({modulesFormation:response}))
        .catch(err => console.error(err));
    }

    tabSelect(event){
        this.state.idMF = parseInt(event.target.value);
        console.log(this.state.idRole);
    }
    
    render() {
        const bodyTab = this.state.modulesFormation.map(element => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td ><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">{element.nom}</button></td>
            </tr>
            );
            return (
                <div>
                <div className="container mt-5">
                <table className="table table-striped table-dark">
                <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">nom</th>
                </tr>
                </thead>
                <tbody>
                {bodyTab}
                </tbody>
                </table>
                </div>
                <ModalListUP_MF id_MF={this.state.idMF}/>
                </div>
                );
            }
        }
export default ListViewMF;