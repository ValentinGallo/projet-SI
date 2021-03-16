//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiMF from './ApiMF';
import ModalListUP_MF from './ModalListUP_MF';

class ListViewMF extends React.Component {
    constructor(props) {
        super(props);
        this.child  = React.createRef();
        this.state = {
            identifiant: parseInt(localStorage.getItem("id")),
            modulesFormation:[],
            nomMF:null,
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
        this.setState({nomMF:event.target.name});
        this.child.current.refresh(event.target.value);
    }
    
    render() {
        const bodyTab = this.state.modulesFormation.map(element => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td >
                <button onClick={this.tabSelect} value={element.id} name={element.nom} type="button" className="btn btn-secondary col-12 mx-auto" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal">{element.nom}
                </button>
            </td>
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
                                </tr>
                            </thead>
                                <tbody>
                                {bodyTab}
                            </tbody>
                        </table>
                    </div>
                        <ModalListUP_MF ref={this.child} nom_MF={this.state.nomMF} />
                </div>
                );
            }
        }
export default ListViewMF;