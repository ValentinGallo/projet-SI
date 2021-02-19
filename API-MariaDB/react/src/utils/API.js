const burl = "http://obiwan2.univ-brest.fr:7032"
// eslint-disable-next-line
export default {
    afficherUsers : function() {
        return fetch(burl+'/user');
    },
    afficherRoles : function() {
        return fetch(burl+'/role');
    },
    supprimeUser : function(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(burl+'/user/'+id, requestOptions)
    },
    postUser : function(id, mdp) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifiant: id, motDePasse:  mdp, idRole: 1})
        };
        return fetch(burl+'/user', requestOptions)
    },
    checkUser : function(id, mdp) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifiant: id, motDePasse:  mdp, idRole: 1})
        };
        return fetch(burl+'/check/'+id, requestOptions)
    }
}

