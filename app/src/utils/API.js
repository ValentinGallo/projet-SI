const burl = "http://obiwan2.univ-brest.fr:7031"
export const neo4jurl = "http://obiwan2.univ-brest.fr:7034"

//Ajouter une fonction pour créer une nouvelle requête,  voir le composant Home pour un exemple de l'utilisation
export default {
    afficherUsers : function() {
        return fetch(burl+'/user');
    },
    afficherRoles : function() {
        return fetch(burl+'/role');
    },
    postUser : function(id, mdp, id_Role) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifiant: id, motDePasse:  mdp, idRole: id_Role})
        };
        return fetch(burl+'/user', requestOptions)
    },
    postMF : function(nom) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom:nom})
        };
        return fetch(burl+'/moduleFormation', requestOptions)
    },
    putUser : function(id, identifiant, mdp, id_Role) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, identifiant: identifiant, motDePasse:  mdp, idRole: id_Role})
        };
        return fetch(burl+'/user', requestOptions)
    },
    checkUser : function(id, mdp) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mdp:  mdp })
        };
        return fetch(burl+'/check/'+id, requestOptions)
    },
    postUP : function(idUtilisateur, nom, url) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom: nom, url: url})
        };
        return fetch(burl+'/unitePeda', requestOptions)
    },
    deleteUser : function(id){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(burl+'/user/'+id, requestOptions)
    },
    deleteMF : function(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(burl+'/module_formation/'+id, requestOptions)
    },
    loadNF : function(){
        return fetch(burl+'/niveauForm')
    },
    getRoleStat : function() {
        return fetch(burl+'/role_stat')
    },
    getStatsMessages : function(id) {
        return fetch(burl+'/stats_messages/'+id)
    },
    getStatsUp : function(id) {
        return fetch(burl+'/stat_utilisateur_up/'+id)
    },
    getApiKey : function() {
        return "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtO+WkhYFnk0H6j7R8tztsHuN0dkrFJHzZM2Vd06x7tWy4fI4GZxfv/4RQ8WuFU+A+uCi9ykKpTMdkeWT7MJeYoaY9uthkOsNoExjqhDRB5UseLORRcWcHXFAXm40a7wXQ2mk+jGBd6VsPEWY7BmtHrR1GCZZrH8GBMBy4w2rmiL3ilC6TfTtTDqpkrBCBLgr41r7g7bp20uGk+5CwijV2c3qsobVe2h9nt3dTvEUzAhEeFGz818mxoneX+yIfSubBz9l/eKM8GOLXxWHhhKYdSEjy24kqQ1Zuv++mg43TP90wioLuq7RaEQJ43r7gdwoLWauO83I0g9XNg28Lz7YqQIDAQAB-----END PUBLIC KEY-----"
    }
}