import React from 'react';
import Contacts from './Contacts';
import Messages from './Messages';
import FormMessage from './FormMessage';
//import UserProfile from '../UserProfile/UserProfile';

const burl = "http://obiwan2.univ-brest.fr:7033";
const burlUser = "http://obiwan2.univ-brest.fr:7032";

export default class Messagerie extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.refreshMessage = this.refreshMessage.bind(this);
    this.state = {
      users: [
      ],
      messages: [
        
      ],
      userSelected: {
        id:1,
        identifiant:'Admin',
        
      }
    };
  }
  
  componentDidMount() {
    fetch(burlUser+'/user')
    .then(response => response.json())
    .then(response => this.setState({users: response}))
    .then((valeur) => {
      var liste_users = this.state.users;
      // get index of object with id:37
      var removeIndex = liste_users.map(function(item) { return item.id; }).indexOf(localStorage.getItem("id"));
      console.log(liste_users)
      console.log(removeIndex)
      // remove object
      liste_users.splice(removeIndex, 1);
      this.setState({users: liste_users});
    })
    .then(response => this.refreshMessage(this.state.userSelected))
    .catch(err => console.error(err));
    
  }
  refreshMessage(user){
    fetch(burl+'/disscussion/'+localStorage.getItem("id")+'/'+user.id)
    .then(response => response.json())
    .then(response => this.setState({messages: response}))
    .catch(err => console.error(err));
    
  }
  handleClick(e) {
    this.setState({userSelected: e});
    this.refreshMessage(e);
    
  }
  render() {
    return <div className="container">
    <div className="row">
    <div className="col-md-3">
    <Contacts users={this.state.users} userSelected={this.state.userSelected} handleClick={this.handleClick} refreshMessage={this.refreshMessage}></Contacts>
    </div>
    <div className="col-md-9">
    <Messages userSelected={this.state.userSelected} lesMessages={this.state.messages}></Messages>
    <FormMessage userSelected={this.state.userSelected}></FormMessage>
    </div>
    </div>
    </div>;
  }
}