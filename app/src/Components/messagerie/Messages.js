import React from 'react';
import UserProfile from './UserProfile';

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [
            ],
        };
      }
      componentDidUpdate() {
        var id = UserProfile.getId();

        console.log("Mon id : "+id+" Desitinataire id : "+this.props.userSelected);
        
        fetch('http://obiwan2.univ-brest.fr:7033/disscussion/'+id+'/'+this.props.userSelected)
        .then(response => response.json())
        .then(response => this.setState({messages: response}))
        .catch(err => console.error(err));
    }
    render() {
        const listMessages= this.state.messages.map((message) =>
        <div className="card" key={message.id}>
        <div className="card-body">
        {message.message}
        </div>
        </div>
        );
        return <div key={this.props.userSelected}>{listMessages}</div>;
    }
}