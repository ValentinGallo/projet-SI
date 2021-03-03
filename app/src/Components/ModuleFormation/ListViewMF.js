//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiMF from './ApiMF'

class ListViewUP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant:1,
            modulesFormation:[]
        };
    }    
    
    componentDidMount() {       
        ApiMF.afficherMF(1,2)
        .then(response => response.json())
        .then(response => this.setState({modulesFormation:response}))
        .catch(err => console.error(err));
    }
    
    render() {
        const bodyTab = this.state.modulesFormation.map(element => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td>{element.nom}</td>
            </tr>
            );
            return (
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
                );
            }
        }
export default ListViewUP;