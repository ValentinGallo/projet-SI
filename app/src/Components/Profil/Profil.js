import React from 'react';
const burl = 'http://obiwan2.univ-brest.fr:7031'
class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listeUp: [],
        };
    }
    componentDidMount(){
        this.refreshUP();
    }
    refreshUP(){
        fetch(burl+'/utilisateur_up/'+localStorage.getItem("id"))
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.length != 0){
                this.setState({listeUp: response})
            }
            
        })
        .catch(err => console.error(err));
        
    }
    render() {
        const listeUP= this.state.listeUp.map((up) =>  <li className="list-group-item">- {up.nom}</li>)
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-6">
            <div className="card text-white bg-dark">
            <div className="card-header">Mon profil</div>
            <div className="card-body">
            <h5 className="card-title">{localStorage.getItem("identifiant")} (id : {localStorage.getItem("id")})</h5>
            <p className="card-text">Role : {localStorage.getItem("nomRole")}</p>
            </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="card">
            <div className="card-header">Mes unités pédagogiques :</div>
            <div className="card-body">
            <p className="card-text">
            <ul className="list-group">
            {listeUP}
            </ul></p>
            <a className="btn btn-dark" href="/UnitePedagogique"><i className="fas fa-book"></i> Consulter mes unités pédagogiques</a>
            </div>
            </div>
            </div>
            </div>
            </div>
            )
            
            
        }
    }
    
    export default Profil;