//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import API from '../../utils/API';
import ModalUserEdit from '../GestionUser/ModalUserEdit'

class ListViewUsers extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: [{ id: null, identifiant: null, motDePasse: null, nomRole: null, idRole: 1}]
        };
    }   
    
    deleteUser = (e) => {
        API.deleteUser(e.target.value)
        .then(response => response.json())
        .then(()=> this.props.refresh())
        .catch(err => console.error(err));
    }

    updateUser(id, identifiant, motDePasse, nomRole, idRole) {
        this.setState({user:[{ id: id, identifiant: identifiant, motDePasse: motDePasse, nomRole: nomRole, idRole: idRole}]});
    }
    
    render() {
        const bodyTab = this.props.users.map((element,index) => 
            <tr key={element.id}>
            <th scope="row">{element.id}</th>
            <td>{element.identifiant}</td>
            <td>{element.nomRole}</td>
            <td>
            <button value={element.id} className="btn btn-danger fas fa-trash-alt" onClick={this.deleteUser.bind()}/>
            <button className="btn btn-warning fas fa-pencil-alt"  onClick={() => this.updateUser(element.id, element.identifiant, element.motDePasse,element.nomRole, element.idRole)}
                    data-bs-toggle="modal" data-bs-target="#exampleModal"/>
            </td>
            </tr>
            );

            return (
                <div>
                <div className="container mt-5">
                <table className="table table-striped table-dark">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">identifiant</th>
                <th scope="col">role</th>
                <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {bodyTab}
                </tbody>
                </table>
                </div>
                <ModalUserEdit user={this.state.user[0]} refresh={this.props.refresh} />
              
                </div>
                );
            }
        }
        export default ListViewUsers;