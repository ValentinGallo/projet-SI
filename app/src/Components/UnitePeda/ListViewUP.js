//Rien d'intéressant ici du pur affichage html/css
import React from 'react';
import ApiUP from './ApiUP'
import ModalListUpdateUP from './ModalListUpdateUP';


class ListViewUP extends React.Component {
    constructor(props) {
        super(props);
        this.child  = React.createRef();
        this.state = {
            identifiant:parseInt(localStorage.getItem("id")),
            unitePeda:[],
            idUP:null
        };
    }    
    
    componentDidMount() {    
        ApiUP.afficherUP(this.state.identifiant)
        .then(response => response.json())
        .then(response => this.setState({unitePeda:response}))
        .then(response => console.log("liste UP"+response))
        .catch(err => console.error(err));
    }

    deleteUP = (index,e) =>{
        const unites = Object.assign([],this.state.unitePeda)
        unites.splice(index,1)
        this.setState({unitePeda:unites})
        ApiUP.deleteUP(e.target.value)
    }

    
    tabSelect(event){
        this.setState({idUP:event.target.value});
        this.child.current.refresh(event.target.value);
        console.log("idMF recupe depuis le bouton:"+event.target.value)
    }
    
    render() {
        var bodyTab 
        if(this.state.unitePeda.length==null){
            bodyTab =
                <tr key="0">
                <th scope="row">-</th>
                <td >Pas d'unité pédagogique</td>
                <td >-</td>
                </tr>
        }else{
            bodyTab = this.state.unitePeda.map((element,index) => 
                <tr key={element.id}>
                    <th scope="row">{element.id}</th>
                    <td >{element.nom}</td>
                    <td><a href={element.url}>{element.url}</a></td>
                    <td><button value={element.id} className="btn btn-danger fas fa-trash-alt" onClick={this.deleteUP.bind(this, index)}/></td>
                    <td><button  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={this.tableSelect}  value={element.id} className="btn btn-warning fas fa-pencil-alt"/></td>
                </tr>
                );
        }
            return (
                <>
                    <div className="container mt-5">
                        <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">nom</th>
                                <th scope="col">URL</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                            <tbody>
                            {bodyTab}
                            </tbody>
                        </table>
                    </div>
                    <ModalListUpdateUP ref={this.child}/>
                </>
                );
            }
        }
export default ListViewUP;