//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../utils/API';

class ListViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            identifiant:''
        };
    }    
    
    componentDidMount() {       
        API.afficherUsers()
        .then(response => response.json())
        .then(response => this.setState({users:response}))
        .catch(err => console.error(err));
    }
    
    handleSubmit(event) {
        console.log(event.target.name)
        /*API.supprimeUser(event.target.name)
        .then(response => response.json())
        .then(response => alert('L\'utilisateur : ' + this.state.identifiant + ' a été supprimé '+response))
        .catch(err => console.error(err));*/
    }
    
    
    render() {
        const bodyTab = this.state.users.map(element => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td>{element.identifiant}</td>
            <td>
                <a type="button" onClick={this.handleSubmit} name={element.identifiant} className="fas fa-trash-alt"/>
            <button type="button" className="btn btn-warning">Modifier</button>
            {element.idRole}
            </td>
            </tr>
            );
            return (
                <div>
                <table className="table table-striped table-dark">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">identifiant</th>
                <th scope="col">role</th>
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
        
        export default ListViewUsers;