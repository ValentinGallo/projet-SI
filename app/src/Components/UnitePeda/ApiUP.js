const burl = "http://obiwan2.univ-brest.fr:7031"
export const neo4jurl = "http://obiwan2.univ-brest.fr:7034"

//Ajouter une fonction pour créer une nouvelle requête,  voir le composant Home pour un exemple de l'utilisation
export default {
    afficherUP : function(id) {
        return fetch(burl+'/utilisateur_up/'+id);
    },
    afficherUP_MF : function(id,idMF) {
        return fetch(burl+'/utilisateur_mf_up/'+id+'/'+idMF);
    },
    ajouterUP : function(id_NF, id_MF, id_User,nom,url) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_nf: id_NF, id_mf: id_MF, id_utilisateur: id_User, nom:nom, url:url})
        };
        return fetch(burl+'/unitePeda', requestOptions)
    },
    deleteUP : function(idUP) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(burl+'/unite_pedagogique/'+idUP, requestOptions)
    }
}