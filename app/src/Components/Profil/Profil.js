import React from 'react';

class Profil extends React.Component {
    
    render() {
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-6">
            <div class="card text-white bg-dark">
            <div class="card-header">Mon profil</div>
            <div class="card-body">
            <h5 class="card-title">{localStorage.getItem("identifiant")} (id : {localStorage.getItem("id")})</h5>
            <p class="card-text">Role : {localStorage.getItem("nomRole")}</p>
            </div>
            </div>
            </div>
            <div className="col-md-6">
            <div class="card">
            <div class="card-header">Mes up :</div>
            <div class="card-body">
            <p class="card-text">-------</p>
            </div>
            </div>
            </div>
            </div>
            </div>
            )
            
            
        }
    }
    
    export default Profil;