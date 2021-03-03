import React from 'react';
import UserProfile from '../UserProfile/UserProfile';

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        this.setState({user: UserProfile.getUser()});

    }
    render() {
        const listMessages= this.props.lesMessages.map((message) =>  
        <div className="row mb-3" key={message.id}>
        <div className={`${this.props.myUser.id === message.idExpediteur ? "" : "col-md-4"}`}></div>
        <div className="col-md-8">
            <div className={`card ${this.props.myUser.id === message.idExpediteur ? "" : "text-white bg-primary"}`}>
                <div className="card-body">
                {this.props.myUser.id === message.idExpediteur ? "Moi : " : "Lui :"}{message.message} {message.idExpediteur}
                </div>
                <div className="card-footer">
                {message.dateEnvoi}
                </div>
            </div>
        </div>
        </div>
        
    );
        return  <div>
            <h1>Discussion avec {this.props.userSelected}</h1>
        {listMessages}
        </div>;
    }
}