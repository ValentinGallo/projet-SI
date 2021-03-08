//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiUP from './ApiUP'
import UpdateFormUnite from './UpdateFormUnite';

class ModalListUP_MF extends React.Component {
    constructor(props) {
        super(props);
        this.child  = React.createRef();
        this.state = {
            identifiant:parseInt(localStorage.getItem("id")),
            idMF:null
        };
    }    

    render() {
            return (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content bg-secondary text-white">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Unité pédagogique : {this.props.nom_MF}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <UpdateFormUnite/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light mx-auto col-12" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        }
        export default ModalListUP_MF;