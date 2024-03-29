import React from 'react';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props)
        this.refreshMessage = this.refreshMessage.bind(this);
    }
    refreshMessage(e) {
        this.props.refreshMessage(e);
    }
    render() {
        const listUsers= this.props.users.map((user) => 
        <button className={`list-group-item list-group-item-action${this.props.userSelected.id === user.id ? " active" : ""}`} key={user.id} onClick={this.refreshMessage.bind(this, user)}>{user.identifiant}</button>
        );
        return <div className="card text-white bg-dark mb-3">
        <div className="card-header"><h3><i className="far fa-address-book"></i> Mes contacts</h3></div>
        <div className="card-body">
        <div className="list-group">
        {listUsers}
        </div>
        </div>
        </div>
    }
}