import React from 'react';
//import UserProfile from './UserProfile';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.handleClick(e);
    }
    render() {
        const listUsers= this.props.users.map((user) => 
        <button className={`list-group-item list-group-item-action${this.props.userSelected === user.id ? " active" : ""}`} key={user.id} onClick={this.handleClick.bind(this, user.id)}>{user.identifiant}[{user.id}]</button>
        );
        return <div>
        <h3>Mes contacts</h3>
        <div className="list-group">
        {listUsers}
        </div>
        </div>;
    }
}