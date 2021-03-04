import React from 'react';
//import UserProfile from '../UserProfile/UserProfile';

const burl = "http://obiwan2.univ-brest.fr:7033";

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.deleteMessage = this.deleteMessage.bind(this);
    }
    deleteMessage(id){
        fetch(burl+'/message/'+ id, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        //.then(this.props.refreshMessage(this.props.userSelected))
    }

    render() {
        const listMessages= this.props.lesMessages.map((message) =>  
        <div className="row mb-3" key={message._id}>
        <div className={`${parseInt(localStorage.getItem("id")) === message.idExpediteur ? "" : "col-md-4"}`}></div>
        <div className="col-md-8">
        <div className={`card ${parseInt(localStorage.getItem("id")) === message.idExpediteur ? "" : "text-white bg-primary"}`}>
        <div className="card-body">
        {parseInt(localStorage.getItem("id")) === message.idExpediteur ? "Moi : " : "Lui :"}{message.message}
        </div>
        <div className="card-footer">
        {message.dateEnvoi}
        </div>
        <button type="button" className="btn btn-danger" onClick={() => this.deleteMessage(message._id)}>Supprimer</button>
        </div>
        </div>
        </div>
        
        );
        
        return  <div>
        <h1><i className="far fa-comments"></i> Discussion avec {this.props.userSelected.identifiant}</h1>
        {listMessages}
        </div>;
    }
}