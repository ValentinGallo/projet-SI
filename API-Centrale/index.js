const express = require('express')
const app = express()
const fetch = require('node-fetch');
const crypto = require('crypto')
const fs = require('fs')
const cors = require('cors');
app.use(cors());

var privateKey = fs.readFileSync('privateKey.pem')

function decryption (encrypted) {
    try {
        var decrypt = Buffer.from(encrypted,'base64')
        return (crypto.privateDecrypt(privateKey,decrypt)).toString()
    } catch(err) {
      console.log('Error')
    }
 }

/*
 * BDD MONGODB 
*/

app.get('/message', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7033/message')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/message/:id', (req,res) => {
    const id = req.params.id

    fetch('http://obiwan2.univ-brest.fr:7033/message/'+id)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.post('/message', async (req,res) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idExpediteur: req.body.idExpediteur, idsDestinataire: req.body.idsDestinataire, message: req.body.message, dateEnvoi: req.body.dateEnvoi, messageLu: false })
    };

    fetch('http://obiwan2.univ-brest.fr:7033/message', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/disscussion/:idExpediteur/:idsDestinataire', async (req,res) => {
    const idExpediteur = req.params.idExpediteur
    const idsDestinataire = req.params.idsDestinataire

    fetch('http://obiwan2.univ-brest.fr:7033/disscussion/'+idExpediteur+'/'+idsDestinataire)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

/*
 * BDD MARIADB 
*/

app.get('/user', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/user')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.post('/check/:identifiant', (req,res) => {
    const identifiant = req.params.identifiant
    const mdp = req.body.mdp
    fetch('http://obiwan2.univ-brest.fr:7032/user/'+identifiant)
    .then(res => res.json())
    .then(json => {
        if(decryption(json[0].motDePasse) == decryption(mdp)) {
            res.status(200).json('{"Result": true}');
        }
        else {
            res.status(200).json('{"Result": false}');
        }
    })
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/cp', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/cp')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/moduleForm', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/moduleForm')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/selectMF', (req,res) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ param: req.body.param })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/selectMF', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/niveauForm', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/niveauForm')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/unitePeda', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/unitePeda')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/selectUP', (req,res) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ param: req.body.param })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/selectUP', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/role', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/role')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.post('/user', (req,res)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant: req.body.identifiant, motDePasse:  req.body.motDePasse, idRole: req.body.idRole })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/user', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.post('/role', (req,res)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: req.body.nom })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/role', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.put('/role', (req,res)=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: req.body.id, nom: req.body.nom })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/role', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.put('/user', (req,res)=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: req.body.id, identifiant: req.body.identifiant, motDePasse:  req.body.motDePasse, idRole: req.body.idRole })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/user', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.delete('/user/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://obiwan2.univ-brest.fr:7032/user/'+id, requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.delete('/role/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://obiwan2.univ-brest.fr:7032/role/'+id, requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})


/*
 * BDD NEO4J 
*/

// Permet d'obtenir les id d'UP d'un utilisateur
app.get('/utilisateur_unitePedagogique/:id', (req,res) => {
    const id = parseInt(req.params.id)

    fetch('http://obiwan2.univ-brest.fr:7034/utilisateur/' + id)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

// Permet d'obtenir les id d'UP d'un MF
app.get('/moduleFormation_unitePedagogique/:id', (req,res) => {
    const id = parseInt(req.params.id)

    fetch('http://obiwan2.univ-brest.fr:7034/formation/' + id)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

/*
 * NEO4J VERS MARIADB
*/

// Permet d'obtenir une liste d'UP d'un utilisateur
app.get('/liste_UP_utilisateur/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_unite_pedagogique = "";

    fetch('http://localhost:7034/utilisateur/' + id)
    .then(res => res.json())
    .then(json => {
        json.forEach(unite_pedagogique => {
            if(nbElement == 0) {
                id_unite_pedagogique = id_unite_pedagogique + unite_pedagogique.id
            } else {
                id_unite_pedagogique = id_unite_pedagogique + "," + unite_pedagogique.id
            }
            nbElement++;
        })
        .catch(function (error) {
            res.status(404).send(error)
        });

        fetch('http://obiwan2.univ-brest.fr:7032/selectUP/' + id_unite_pedagogique)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    }).catch(function (error) {
        res.status(404).send(error)
    })
}) 

// Permet d'obtenir les infos des UP d'un MF
app.get('/liste_UP_moduleFormation/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_unite_pedagogique = "";

    fetch('http://localhost:7034/formation/' + id)
    .then(res => res.json())
    .then(json => {
        json.forEach(unite_pedagogique => {
            if(nbElement == 0) {
                id_unite_pedagogique = id_unite_pedagogique + unite_pedagogique.id
            } else {
                id_unite_pedagogique = id_unite_pedagogique + "," + unite_pedagogique.id
            }
            nbElement++;
        })
        .catch(function (error) {
            res.status(404).send(error)
        });

        fetch('http://obiwan2.univ-brest.fr:7032/selectUP/' + id_unite_pedagogique)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    }).catch(function (error) {
        res.status(404).send(error)
    })
})

app.use(express.json())

app.listen(7031, () => {
    console.log('API Centrale à lécoute')
})