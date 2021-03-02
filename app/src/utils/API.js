const burl = "http://obiwan2.univ-brest.fr:7032"
export const neo4jurl = "http://obiwan2.univ-brest.fr:7034"

//Ajouter une fonction pour créer une nouvelle requête,  voir le composant Home pour un exemple de l'utilisation
export default {
    afficherUsers : function() {
        return fetch(burl+'/user');
    },
    afficherRoles : function() {
        return fetch(burl+'/role');
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