import React from 'react';
import API from '../../utils/API';

const burl = "http://obiwan2.univ-brest.fr:7031"

export default class Statistiques extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [
            ],
            users2: [
            ],
            roles: [
            ]
          };
    }
    componentDidMount(){
        API.afficherUsers()
        .then(response => response.json())
        .then(response => this.setState({users: response}))
        .then(() => this.listeUsers())
        .catch(err => console.error(err));

        API.getRoleStat()
        .then(response => response.json())
        .then(response => this.setState({roles: response}))
        .catch(err => console.error(err));
    }
    listeUsers() {
        var listeUsers = [];
        this.state.users.map(async(user) => {
            var newUser = user;
            const response = await API.getStatsMessages(newUser.id)
            const json = await response.json();
            user["nbMessageEnvoye"] = await json.nbMessageEnvoye;
            user["nbMessageRecu"] = await json.nbMessageRecu;
            const response2 = await API.getStatsUp(newUser.id)
            const json2 = await response2.json();
            if(json2[0] == undefined){
                user["nbUp"] = 0
            }
            else {
                user["nbUp"] = await json2[0].low;
            }
            await listeUsers.push(newUser);
        });
        setTimeout(() => { this.setState({users: listeUsers}) }, 500);
        
    }
    render() {
        const listUsers= this.state.users.map((user) => <tr key={user.id}>
        <th scope="row">{user.identifiant}</th>
        <td>{user.nbMessageRecu}</td>
        <td>{user.nbMessageEnvoye}</td>
        <td>{user.nbUp}</td>
        </tr>
        );
        const listeRoles= this.state.roles.map((role) => <li className="list-group-item" key={role.nom} ><span className="badge bg-primary">{role.nbUsers}</span> {role.nom}</li>
        );

        return <div className="container">
        <h1>Les statistiques</h1>
        <div className="row">
        <div className="col-md-3">
        <div className="card">
        <div className="card-body">
        <h5>Statistiques des roles</h5>
        <ul className="list-group">
            {listeRoles}
        </ul>
        </div>
        </div>
        </div>
        <div className="col-md-9">
        <div className="card">
        <div className="card-body">
        <table className="table">
        <thead>
        <tr>
        <th scope="col">Utilisateurs</th>
        <th scope="col">Messages reçues</th>
        <th scope="col">Messages envoyés</th>
        <th scope="col">Nb UP créés</th>
        </tr>
        </thead>
        <tbody>
        {listUsers}
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        
        </div>
    }
}