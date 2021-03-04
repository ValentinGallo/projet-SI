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
        console.log('envoie mess')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { idExpediteur: parseInt(localStorage.getItem("id")),
                idDestinataire:  this.props.userSelected.id,
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
        return <div className="card border-primary mb-3 col-md-7">
        <div className="card-header">Ecrire un message</div>
        <div className="card-body text-primary">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <textarea className="form-control mb-3" value={this.state.value} onChange={this.handleChange} rows="3"></textarea>
        <div className="row">
            <div className="col-md-9"></div>
        <input type="submit" className="btn btn-primary col-md-3" value="Envoyer"/>
        </div>
        </div>
        </form>
        </div>
        </div>;
    }
}