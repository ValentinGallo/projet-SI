const express = require('express')
const app = express()
const fetch = require('node-fetch');
app.use(express.json())
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
      console.log(err)
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
        body: JSON.stringify(req.body)
    };

    fetch('http://obiwan2.univ-brest.fr:7033/message', requestOptions)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.delete('/message/:id', async (req,res) => {
    const id = req.params.id

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://obiwan2.univ-brest.fr:7033/message/'+id, requestOptions)
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
        if(decryption(json[0].motDePasse) == decryption(mdp) && decryption(json[0].motDePasse) != undefined && decryption(mdp) != undefined) {
            res.status(200).json({ "Result": true, "id": json[0].id, "identifiant": json[0].identifiant, "nomRole": json[0].nomRole });
        }
        else {
            res.status(200).json({ "Result": false });
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

// Permet d'ajouter une unité pédagogique
app.post('/unitePeda', (req,res) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: req.body.nom, url: req.body.url })
    };

    // Création de l'UP dans MariaDB
    fetch('http://obiwan2.univ-brest.fr:7032/unitePeda', requestOptions)
    .then(res => res.json())
    .then(json => {
        // Création de l'UP dans Neo4j
        var id_up = json[0].id
        fetch('http://obiwan2.univ-brest.fr:7034/unite_pedagogique/' + id_up, requestOptions)
        .then(json => {
            // Fait la relation avec l'utilisateur dans Neo4j
            fetch('http://obiwan2.univ-brest.fr:7034/utilisateur_up/' + req.body.id_utilisateur + '/' + id_up, requestOptions)
            .then(json => {
                // Fait la relation avec le MF dans Neo4j
                fetch('http://obiwan2.univ-brest.fr:7034/mf_up/' + req.body.id_mf + '/' + id_up, requestOptions)
                .then(json => {
                    // Fait la relation avec le NF dans Neo4j
                    fetch('http://obiwan2.univ-brest.fr:7034/up_nf/' + id_up + '/' + req.body.id_nf, requestOptions)
                    .then(json => {
                        res.status(200).send()
                    })
                })  
            })
        })
    })
    .catch(function (error) {
        res.status(404).send(error)
    });
})

// Permet d'ajouter un module de formation
app.post('/moduleFormation', (req,res) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: req.body.nom })
    };

    // Création du MF dans MariaDB
    fetch('http://obiwan2.univ-brest.fr:7032/moduleFormation', requestOptions)
    .then(res => res.json())
    .then(json => {
        // Création du MF dans Neo4j
        var id_mf = json[0].id
        fetch('http://obiwan2.univ-brest.fr:7034/module_formation/' + id_mf)
        .then(json => {
            // Fait la relation avec l'utilisateur dans Neo4j
            fetch('http://obiwan2.univ-brest.fr:7034/utilisateur_mf/' + req.body.id_utilisateur + '/' + id_mf)
            res.status(200).send()
        })
    })
    .catch(function (error) {
        res.status(404).send(error)
    });
})

app.get('/selectUP/:id', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/selectUP/'+req.params.id)
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
    .then(json => {
        // Création de l'utilisateur dans Neo4j
        var id_utilisateur = json[0].id
        fetch('http://obiwan2.univ-brest.fr:7034/utilisateur/' + id_utilisateur, requestOptions)
        res.status(200).send()
    })
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

app.put('/unite_pedagogique', (req,res)=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: req.body.id, nom: req.body.nom, url: req.body.url})
    };

    fetch('http://obiwan2.univ-brest.fr:7032/unite_pedagogique', requestOptions)
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
    .then(json => 
        //Suppresion de l'utilisateur dans Neo4J
        fetch('http://obiwan2.univ-brest.fr:7034/utilisateur/' + id, requestOptions)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    )
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
 * NEO4J VERS MARIADB
*/

// Permet d'obtenir une liste d'UP d'un utilisateur
app.get('/utilisateur_up/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_unite_pedagogique = "";

    fetch('http://obiwan2.univ-brest.fr:7034/utilisateur_up/' + id)
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

        fetch('http://obiwan2.univ-brest.fr:7032/selectUP/' + id_unite_pedagogique)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(200).send("[]")
        })
    }).catch(function (error) {
        res.status(200).send("[]")
    })
}) 

// Permet d'obtenir une liste de MF d'un utilisateur
app.get('/utilisateur_mf/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_module_formation = "";

    fetch('http://obiwan2.univ-brest.fr:7034/utilisateur_up/' + id)
    .then(res => res.json())
    .then(json => {
        json.forEach(module_formation => {
            if(nbElement == 0) {
                id_module_formation = id_module_formation + module_formation.id
            } else {
                id_module_formation = id_module_formation + "," + module_formation.id
            }
            nbElement++;
        })

        fetch('http://obiwan2.univ-brest.fr:7032/selectMF/' + id_module_formation)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    }).catch(function (error) {
        res.status(404).send(error)
    })
}) 

// Permet d'obtenir le NF d'un utilisateur
app.get('/utilisateur_nf/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_niveau_formation = "";

    fetch('http://obiwan2.univ-brest.fr:7034/utilisateur_up/' + id)
    .then(res => res.json())
    .then(json => {
        json.forEach(niveau_formation => {
            if(nbElement == 0) {
                id_niveau_formation = id_niveau_formation + niveau_formation.id
            } else {
                id_niveau_formation = id_niveau_formation + "," + niveau_formation.id
            }
            nbElement++;
        })

        fetch('http://obiwan2.univ-brest.fr:7032/selectMF/' + id_niveau_formation)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    }).catch(function (error) {
        res.status(404).send(error)
    })
}) 

// Permet d'obtenir une liste d'UP d'un MF
app.get('/up_mf/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_unite_pedagogique = "";

    fetch('http://obiwan2.univ-brest.fr:7034/up_mf/' + id)
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
app.get('/up_mf/:id', (req,res) => {
    const id = parseInt(req.params.id)

    var nbElement = 0;
    var id_unite_pedagogique = "";

    fetch('http://obiwan2.univ-brest.fr:7034/up_mf/' + id)
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

// Permet d'obtenir les infos des UP d'un MF également lié à un utilisateur
app.get('/utilisateur_mf_up/:id_utilisateur/:id_module_formation', (req,res) => {
    const id_utilisateur = parseInt(req.params.id_utilisateur)
    const id_module_formation = parseInt(req.params.id_module_formation)

    var nbElement = 0;
    var id_unite_pedagogique = "";

    fetch('http://obiwan2.univ-brest.fr:7034/utilisateur_mf_up/' + id_utilisateur + '/' + id_module_formation)
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

        fetch('http://obiwan2.univ-brest.fr:7032/selectUP/' + id_unite_pedagogique)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(200).send("{}")
        })
    }).catch(function (error) {
        res.status(404).send(error)
    })
})

// Permet de supprimer une UP
app.delete('/unite_pedagogique/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://obiwan2.univ-brest.fr:7032/unitePeda/'+id, requestOptions)
    .then(res => res.json())
    .then(json => 
        //Suppresion de l'up dans Neo4J
        fetch('http://obiwan2.univ-brest.fr:7034/unite_pedagogique/' + id, requestOptions)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    )
    .catch(function (error) {
        res.status(404).send(error)
    });
})

// Permet de supprimer un MF
app.delete('/module_formation/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://obiwan2.univ-brest.fr:7032/moduleFormation/'+id, requestOptions)
    .then(res => res.json())
    .then(json => 
        //Suppresion de l'up dans Neo4J
        fetch('http://obiwan2.univ-brest.fr:7034/module_formation/' + id, requestOptions)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    )
    .catch(function (error) {
        res.status(404).send(error)
    });
})

// Permet d'ajouter un Niveau de Formation
app.post('/niveau_formation', (req,res)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: req.body.nom })
    };

    fetch('http://obiwan2.univ-brest.fr:7032/niveauForm/', requestOptions)
    .then(res => res.json())
    .then(json => {
        //Ajout du niveau de formation dans Neo4J
        var id_nf = json[0].id
        fetch('http://obiwan2.univ-brest.fr:7034/niveau_formation/' + id_nf, requestOptions)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    })
    .catch(function (error) {
        res.status(404).send(error)
    });
})

// Permet de supprimer un Niveau de Formation
app.delete('/niveau_formation/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://obiwan2.univ-brest.fr:7032/niveauForm/'+id, requestOptions)
    .then(res => res.json())
    .then(json => 
        //Suppresion de l'up dans Neo4J
        fetch('http://obiwan2.univ-brest.fr:7034/niveau_formation/' + id, requestOptions)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(function (error) {
            res.status(404).send(error)
        })
    )
    .catch(function (error) {
        res.status(404).send(error)
    });
})
//Statistique
//affiche le nombre de user par role
app.get('/role_stat', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/role_stat')
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})

//affiche le nombre de messages pour un user
app.get('/stats_messages/:id', (req,res) => {
    const id = req.params.id
    fetch('http://obiwan2.univ-brest.fr:7033/stats_messages/'+id)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})
//affiche le nombre d'up pour un user
app.get('/stat_utilisateur_up/:id_utilisateur', (req,res) => {
    const id_utilisateur = parseInt(req.params.id_utilisateur)
    fetch('http://obiwan2.univ-brest.fr:7034/stat_utilisateur_up/'+id_utilisateur)
    .then(res => res.json())
    .then(json => res.status(200).json(json))
    .catch(function (error) {
        res.status(404).send(error)
    });
})


app.listen(7031, () => {
    console.log('API Centrale à l\'écoute')
})
