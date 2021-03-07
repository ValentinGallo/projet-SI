//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import UserForm from './UserForm';
import ListViewUsers from './ListViewUsers';

class GestionUserPage extends React.Component {
    
    
    render() {
        return(
        <div className="container">
            <ListViewUsers/>
            <UserForm/>
        </div>
        )
    }
}
export default GestionUserPage;