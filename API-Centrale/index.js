const express = require('express')
const app = express()
const fetch = require('node-fetch');
const crypto = require('crypto')
const fs = require('fs')

var privateKey = fs.readFileSync('privateKey.pem')
var publicKey = fs.readFileSync('publicKey.pem')

var toencrypt = 'LeMDPDeValentin'
var encrypt = Buffer.from(toencrypt)
var mdprecu = crypto.publicEncrypt(publicKey,encrypt).toString('base64')

function decryption (encrypted) {
    try {
        var decrypt = Buffer.from(encrypted,'base64')
        return (crypto.privateDecrypt(privateKey,decrypt)).toString()
    } catch(err) {
      console.log('Error')
    }
 }

app.use(express.json())

app.listen(7031, () => {
    console.log('API Centrale à lécoute')
})

/*
 * BDD MONGODB 
*/

app.get('/messages', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7033/messages')
    .then(res => res.json())
    .then(json => res.status(200).json(json));
})

app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    fetch('http://localhost:8080/users/'+id)
    .then(res => res.json())
    .then(json => res.status(200).json(json));
})

/*
 * BDD MARIADB 
*/

app.get('/user', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/user')
    .then(res => res.json())
    .then(json => res.status(200).json(json));
})

app.get('/user/prenom', (req,res) => {
    fetch('http://obiwan2.univ-brest.fr:7032/user/prenom')
    .then(res => res.json())
    .then(json => res.status(200).json(json));
})

app.get('/user/:id', (req,res) => {
    const id = parseInt(req.params.id)
    fetch('http://obiwan2.univ-brest.fr:7032/user/'+id)
    .then(res => res.json())
    .then(json => {
        if(decryption(json[0].motDePasse) == decryption(mdprecu)) {
            console.log(decryption(mdprecu))
            res.status(200).json(json)
        }
        else {
            res.status(400).json(json)
        }
    });
})

app.get('/check/:id/:mdp', (req,res) => {
    const id = parseInt(req.params.id)
    const mdp = "nDKqeopS7hl62S1ISx4k87Noq0zlzir0+8wxsYRpfeCMKoL0RV89EPZscXG0iNWnQ2gHZN1+2pVukHpFX30svTl+f3JNpxoETP3sM+EI5uXs4pkfRiTCFb40Bc+nIZrBKDKf5eSv8kSotTEr0fx9dcEoA0UNN1pJDW/avyy/SgQgsCRs5se5081ntM06cnrVyPciTTB1Us+irr2bFzsrXawoDPxY5P9NTWCQQ/tFGfv0ebt3Ffa3OW+cUFLeARpjxr+77VlGLZxK4ObBxZwJxGG7veyKifXBY3iq3EZFCvVg69PZQIJIQa/lhaln8Urzt3W1xDobk8MUHCCjJHR3Jw=="
    fetch('http://obiwan2.univ-brest.fr:7032/user/'+id)
    .then(res => res.json())
    .then(json => {
        console.log(decryption(json[0].motDePasse))
        console.log(decryption(mdp))
        if(decryption(json[0].motDePasse) == decryption(mdp)) {
            res.status(200)
        }
        else {
            res.status(400).send({ error: 'Mot de passe incorrect' });
        }
    });
})

/*
 * BDD NEO4J 
*/


/*app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    fetch('http://localhost:8080/parkings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => res.status(200).json(json));
})*/