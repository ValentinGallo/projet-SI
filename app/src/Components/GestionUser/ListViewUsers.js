//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';

class ListViewUsers extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users
        };
    }   
    
    deleteUser = (index, e) => {
        const users = Object.assign([], this.state.users)
        users.splice(index, 1)
        this.setState({users:users})
        API.deleteUser(e.target.value)
        .then(response => response.json())
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
        const bodyTab = this.state.users.map((element,index) => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td>{element.identifiant}</td>
            <td>
            <button value={element.id} className="btn btn-danger fas fa-trash-alt" onClick={this.deleteUser.bind(this,index)}/>
            <button value={element.id} className="btn btn-warning fas fa-pencil-alt" onClick={this.updateUser} name={element.id}/>
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