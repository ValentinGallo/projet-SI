const express = require('express')
const neo4j = require('neo4j-driver') 
const app = express()

const driver = neo4j.driver('bolt://obiwan2.univ-brest.fr:7687')
const session = driver.session()

app.get('/test', (req,res) => {
    driver.verifyConnectivity()
    .then((log) => {
        res.send(log);
    })
})

app.listen(7034, () => {
    console.log('Serveur à l\'écoute')
})