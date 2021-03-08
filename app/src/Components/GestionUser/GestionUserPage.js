//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import UserForm from './UserForm';
import ListViewUsers from './ListViewUsers';
import API from '../../utils/API';


class GestionUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        };
    }   

componentDidMount() {       
    API.afficherUsers()
    .then(response => response.json())
    .then(response => this.setState({isLoaded: true, items: response}))
    .catch(err => console.error(err));
}


    render() {
        return(
        <div className="container">
            <ListViewUsers users={this.state.users}/>
            <UserForm users={this.state.users}/>
        </div>
        )
    }
}
export default GestionUserPage;