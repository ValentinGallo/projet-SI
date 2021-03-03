import React from 'react';
const burl = "http://obiwan2.univ-brest.fr:7033";

export default class FormMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { idExpediteur: this.props.myUser.id,
                    idDestinataire:  this.props.userSelected,
                    message: this.state.value,
                    dateEnvoi: Date(),
                    messageLu: false
                }
                )
            };
            
            fetch(burl+'/message', requestOptions)
            .catch(err => console.error(err));
            event.preventDefault();
        }
        
        render() {
            return <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>Ecrire un message</label>
            <textarea className="form-control mb-2" value={this.state.value} onChange={this.handleChange} rows="3"></textarea>
            <input type="submit" className="btn btn-primary" value="Envoyer"/>
            </div>
            </form>;
        }
    }