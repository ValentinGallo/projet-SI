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
      userSelected: 1,
      myUser: {
        id:0
      }
    };
  }
  
  componentDidMount() {
    fetch(burlUser+'/user')
    .then(response => response.json())
    .then(response => this.setState({users: response}))
    .then(response => this.setState({myUser: this.state.users[1]}))
    .then((valeur) => {
      var liste_users = this.state.users;
      liste_users.splice(liste_users.indexOf(this.state.myUser), 1);
      this.setState({users: liste_users});
    })
    .catch(err => console.error(err));
    
  }
  refreshMessage(e){
    const id = this.state.myUser.id;
    console.log("Mon id : "+id+" Desitinataire id : "+e);
    
    fetch(burl+'/disscussion/'+id+'/'+e)
    .then(response => response.json())
    .then(response => this.setState({messages: response}))
    .catch(err => console.error(err));

  }
  handleClick(e) {
    console.log(e)
    this.setState({userSelected: e});
    this.refreshMessage(e);
    
  }
  render() {
    return <div className="container">
    <div className="row">
    <div className="col-md-3">
    <Contacts users={this.state.users} userSelected={this.state.userSelected} handleClick={this.handleClick} refreshMessage={this.refreshMessage} myUser={this.state.myUser}></Contacts>
    </div>
    <div className="col-md-9">
    <Messages userSelected={this.state.userSelected} lesMessages={this.state.messages} myUser={this.state.myUser}></Messages>
    <FormMessage userSelected={this.state.userSelected} myUser={this.state.myUser}></FormMessage>
    </div>
    </div>
    </div>;
  }
}