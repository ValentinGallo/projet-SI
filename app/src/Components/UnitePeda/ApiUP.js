const burl = "http://obiwan2.univ-brest.fr:7031"
export const neo4jurl = "http://obiwan2.univ-brest.fr:7034"

//Ajouter une fonction pour créer une nouvelle requête,  voir le composant Home pour un exemple de l'utilisation
export default {
    afficherUP : function(id) {
        return fetch(burl+'/liste_UP_utilisateur/'+id);
    },
    /*postUser : function(id, mdp, id_Role) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifiant: id, motDePasse:  mdp, idRole: id_Role})
        };
        return fetch(burl+'/user', requestOptions)
    },*/
}