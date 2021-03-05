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
        <div class="card-header">
        <i class="fas fa-user"></i> {parseInt(localStorage.getItem("id")) === message.idExpediteur ? localStorage.getItem("identifiant") : this.props.userSelected.identifiant}
  </div>
        <div className="card-body">
        {message.message}
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
            <div className="row text-white">
                <div className="col-md-10">
                <h1><i className="far fa-comments"></i> Discussion avec {this.props.userSelected.identifiant}</h1>
                </div>
                <div className="col-md-2">
                <h1><i className="fas fa-sync-alt" style={{cursor:'pointer'}} onClick={() => this.props.refreshMessage(this.props.userSelected)}></i></h1>
                    </div>
            </div>
       
        <div className="form-check text-white">
        <input className="form-check-input" type="checkbox" id="defaultCheck1" defaultChecked={this.state.isChecked} onChange={this.handleChange} style={{cursor:'pointer'}}/>
        <label className="form-check-label" htmlFor="defaultCheck1" style={{cursor:'pointer'}}> Mode Edition</label>
        </div>
        {listMessages}
        </div>;
    }
}