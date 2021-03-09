//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import UserForm from './UserForm';
import ListViewUsers from './ListViewUsers';
import API from '../../utils/API';


class GestionUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            isLoading:false
        };
        this.refresh = this.refresh.bind(this);
    }   

componentDidMount() {       
    this.refresh()
}

refresh() {
    API.afficherUsers()
    .then(response => response.json())
    .then(response => this.setState({users: response, isLoading:true}))
    .catch(err => console.error(err));
}



    render() {
        if(!this.state.isLoading) {
            return(
                <div className="container">
                    <p>Chargement</p>
                </div> 
            );
        }
        else {
            return(
                <div className="container">
                    <ListViewUsers users={this.state.users} refresh={this.refresh}/>
                    <UserForm refresh={this.refresh}/>
                </div> 
            )
        }
    }
}
export default GestionUserPage;