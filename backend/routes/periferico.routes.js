// Importa o módulo `express`, que é uma biblioteca para criar servidores web em Node.js.
const express = require('express');

// Cria um novo roteador Express, que será usado para definir rotas específicas.
const perifericoRouter = express.Router();

// Importa as funções do controlador para gerenciar as operações com periféricos.
const { 
    addPeriferico,       // Função para adicionar um novo periférico.
    getAllPerifericos,   // Função para obter todos os periféricos.
    getOnePeriferico,    // Função para obter um periférico específico por ID.
    deletePeriferico,    // Função para excluir um periférico por ID.
    updatePeriferico     // Função para atualizar um periférico por ID.
} = require('../controller/periferico.controller.js');

// Define a rota para obter todos os periféricos. Quando uma requisição GET é feita para '/periferico', a função `getAllPerifericos` é chamada.
perifericoRouter.get('/', getAllPerifericos);

// Define a rota para obter um periférico específico. Quando uma requisição GET é feita para '/periferico/:id', a função `getOnePeriferico` é chamada.
// O `:id` é um parâmetro de rota que representa o ID do periférico que queremos obter.
perifericoRouter.get('/:id', getOnePeriferico);

// Define a rota para adicionar um novo periférico. Quando uma requisição POST é feita para '/periferico', a função `addPeriferico` é chamada.
perifericoRouter.post('/', addPeriferico);

// Define a rota para excluir um periférico específico. Quando uma requisição DELETE é feita para '/periferico/:id', a função `deletePeriferico` é chamada.
// O `:id` é um parâmetro de rota que representa o ID do periférico que queremos excluir.
perifericoRouter.delete('/:id', deletePeriferico);

// Define a rota para atualizar um periférico específico. Quando uma requisição PUT é feita para '/periferico/:id', a função `updatePeriferico` é chamada.
// O `:id` é um parâmetro de rota que representa o ID do periférico que queremos atualizar.
perifericoRouter.put('/:id', updatePeriferico);

// Exporta o roteador configurado para que possa ser usado em outras partes do aplicativo.
module.exports = perifericoRouter;
