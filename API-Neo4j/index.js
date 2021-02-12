const express = require('express')
const neo4j = require('neo4j-driver') 
const app = express()

const driver = neo4j.driver('bolt://obiwan2.univ-brest.fr:7687')
const session = driver.session()

app.get('/', (req,res) => {
    driver.verifyConnectivity()
    .then(() => {
        res.send("Connexion Neo4j: ✔️");
    }, () => {
        res.send("Connexion Neo4j: ❌");
    });
})



app.listen(7034, () => {
    console.log('Serveur à l\'écoute')
})