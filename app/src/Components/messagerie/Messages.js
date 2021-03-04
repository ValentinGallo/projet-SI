import React from 'react';
//import UserProfile from '../UserProfile/UserProfile';

const burl = "http://obiwan2.univ-brest.fr:7033";

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false,
          };
        this.handleChange = this.handleChange.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }
    deleteMessage(id){
        fetch(burl+'/message/'+ id, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(() => this.props.refreshMessage(this.props.userSelected))
    }
    handleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
    }
    render() {
        const listMessages= this.props.lesMessages.map((message) =>  
        <div className="row mb-3" key={message._id}>
        <div className={`${parseInt(localStorage.getItem("id")) === message.idExpediteur ? "" : "col-md-4"}`}></div>
        <div className="col-md-8">
        <div className={`card ${parseInt(localStorage.getItem("id")) === message.idExpediteur ? "" : "text-white bg-primary"}`}>
        <div className="card-body">
        {parseInt(localStorage.getItem("id")) === message.idExpediteur ? localStorage.getItem("identifiant")+" : " : this.props.userSelected.identifiant+" : "}{message.message}
        <i className={`fas fa-trash-alt ${this.state.isChecked ? "" : "d-none"}`} style={{position:'absolute', right:'7px',color:'red', cursor:'pointer'}} onClick={() => this.deleteMessage(message._id)}></i>
        </div>
        <div className="card-footer" style={{fontSize: 'x-small'}}>
        {message.dateEnvoi}
        </div>
        </div>
        </div>
        </div>
        
        );
        
        return  <div>
        <h1 className="text-white"><i className="far fa-comments"></i> Discussion avec {this.props.userSelected.identifiant}<i className="fas fa-sync-alt" style={{marginLeft:'25rem',cursor:'pointer'}} onClick={() => this.props.refreshMessage(this.props.userSelected)}></i></h1>
        <div className="form-check text-white">
        <input className="form-check-input" type="checkbox" id="defaultCheck1" defaultChecked={this.state.isChecked} onChange={this.handleChange} />
        <label className="form-check-label" for="defaultCheck1"> Mode Edition</label>
        </div>
        {listMessages}
        </div>;
    }
}