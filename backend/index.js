const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = '5000';

app.use(express.json());

const Perifericos = require('./models/perifericos.models.js');

const {addPeriferico, getAllPerifericos, getOnePeriferico, deletePeriferico, updatePeriferico} = require('./controller/perifericos.controller.js');

function connection() {
    mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{console.log('CONECTADO AO DB')})
    .catch(()=>{console.log('NÃO CONECTADO')});
}

app.listen(port, ()=>{
    console.log(`Running on: http://localhost:${port}` )
    connection();
});

/* Rota para cadastrar um novo periférico */
app.post('/Cadastrar', addPeriferico);

/* Rota para apresentar todo os periféricos cadastrados */
app.get('/', getAllPerifericos);

/* Rota para apresentar apenas um periférico baseado na rota */
app.get('/:id', getOnePeriferico);

/* Rota para deletar um periférico */
app.delete('/:id', deletePeriferico);

/*  */
app.put('/:id', updatePeriferico);