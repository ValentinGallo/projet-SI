const burl = "http://obiwan2.univ-brest.fr:7031"
export const neo4jurl = "http://obiwan2.univ-brest.fr:7034"

//Ajouter une fonction pour créer une nouvelle requête,  voir le composant Home pour un exemple de l'utilisation
export default {
    afficherMF : function() {
        return fetch(burl+'/moduleForm');
    }
}