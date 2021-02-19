import React from 'react';
import Contacts from './Contacts';
import Messages from './Messages';
import UserProfile from './UserProfile';

export default class Messagerie extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      users: [
      ],
      userSelected: 1,
    };
  }
  
  componentDidMount() {
    fetch('http://obiwan2.univ-brest.fr:7032/user')
    .then(response => response.json())
    .then(response => this.setState({users: response}))
    .then(response => UserProfile.setUser(this.state.users[0]))
    .catch(err => console.error(err));
    
  }
  handleClick(e) {

    this.setState({userSelected: e});
    console.log(this.state.userSelected)
  }
  render() {
    return <div className="container">
    <div className="row">
    <div className="col-md-3">
    <Contacts users={this.state.users} userSelected={this.state.userSelected} handleClick={this.handleClick}></Contacts>
    </div>
    <div className="col-md-9">
    <Messages userSelected={this.state.userSelected}></Messages>
    </div>
    </div>
    </div>;
  }
}