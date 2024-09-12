// Importa o módulo `express`, que é uma biblioteca para criar servidores web em Node.js.
const express = require('express');

// Importa o módulo `mongoose`, que é uma biblioteca para interagir com o banco de dados MongoDB.
const mongoose = require('mongoose');

// Cria uma instância do aplicativo Express.
const app = express();

// Define a porta onde o servidor irá escutar as requisições. Neste caso, a porta é 5000.
const port = '5000';

// Importa o roteador que define as rotas para gerenciar periféricos.
const perifericoRouter = require('./routes/periferico.routes.js');
const userRouter = require('./routes/user.routes.js');

// Configura o Express para usar o middleware que faz o parsing de JSON nas requisições.
app.use(express.json());

// Importa o modelo de dados para periféricos, que define como os dados dos periféricos devem ser armazenados no banco de dados.
//const Perifericos = require('./models/periferico.models.js');

// Função para estabelecer a conexão com o banco de dados MongoDB.
function connection() {
    // Conecta ao banco de dados MongoDB local na porta padrão 27017.
    mongoose.connect('mongodb://localhost:27017/')
    .then(() => {
        // Se a conexão for bem-sucedida, exibe uma mensagem no console.
        console.log('CONECTADO AO DB');
    })
    .catch(() => {
        // Se a conexão falhar, exibe uma mensagem de erro no console.
        console.log('NÃO CONECTADO');
    });
}

// Faz o servidor Express começar a ouvir na porta definida (5000).
app.listen(port, () => {
    // Quando o servidor começar a rodar, exibe uma mensagem no console com a URL onde o servidor está acessível.
    console.log(`Running on: http://localhost:${port}`);
    // Chama a função para conectar ao banco de dados.
    connection();
});

// Configura o Express para usar o roteador importado para todas as requisições que começam com '/periferico'.
app.use('/periferico', perifericoRouter);

app.use('/usuario', userRouter);