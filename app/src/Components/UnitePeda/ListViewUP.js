//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiUP from './ApiUP'

class ListViewUP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant:1,
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
                <div className="container mt-5">
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
                );
            }
        }
export default ListViewUP;