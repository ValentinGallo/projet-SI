//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';

class ListViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            identifiant:''
        };
    }    
    
    componentDidMount() {       
      this.refresh();
    }
    
    deleteUser(event) {
        console.log(event.target.name)
        API.deleteUser(event.target.name)
        .then(response => response.json())
        .then(response => alert('L\'utilisateur : ' + this.state.identifiant + ' a été supprimé '+response))
        .then(()=>this.setState())
        .catch(err => console.error(err));
    }

    refresh(){
        API.afficherUsers()
        .then(response => response.json())
        .then(response => this.setState({users:response}))
        .catch(err => console.error(err));
    }

    updateUser(event) {
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
            <button type="submit" className="btn btn-danger fas fa-trash-alt" onClick={this.deleteUser} name={element.id}/>
            <button type="submit" className="btn btn-warning fas fa-pencil-alt" onClick={this.updateUser} name={element.id}/>
            </td>
            </tr>
            );
            return (
                <div className="container mt-5">
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