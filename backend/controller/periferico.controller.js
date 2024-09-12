// Importa o modelo de dados para periféricos, que define como os dados dos periféricos devem ser armazenados no banco de dados.
const Periferico = require('../models/periferico.models.js')

// Função para adicionar um novo periférico ao banco de dados.
const addPeriferico = async (req, res) => {
    try {
        // Extrai as informações do periférico enviadas na requisição (req.body).
        const { produtoTipo, modelo, marca, anoFabricacao, caracteristicas } = req.body;

        // Cria um novo objeto com as informações do periférico.
        let novoPeriferico = {
            produtoTipo,
            modelo,
            marca,
            anoFabricacao,
            caracteristicas
        };

        // Salva o novo periférico no banco de dados e espera a operação terminar.
        const periferico = await Periferico.create(novoPeriferico);

        // Retorna o periférico adicionado com um status de sucesso (200).
        res.status(200).json(periferico);

    } catch(error) {
        // Se ocorrer um erro, retorna uma mensagem de erro com status 500 (erro interno do servidor).
        res.status(500).json({message: error.message});
    }
}

// Função para obter todos os periféricos armazenados no banco de dados.
const getAllPerifericos = async (req, res) => {
    try {
        // Busca todos os periféricos no banco de dados.
        const perifericos = await Periferico.find();

        // Retorna todos os periféricos encontrados com um status de sucesso (200).
        res.status(200).json({perifericos});

    } catch(error) {
        // Se ocorrer um erro, retorna uma mensagem de erro com status 500.
        res.status(500).json({message: error.message});
    }
};

// Função para obter um periférico específico com base no ID fornecido na requisição.
const getOnePeriferico = async (req, res) => {
    try {
        // Extrai o ID do periférico da URL da requisição (req.params).
        const {id} = req.params;

        // Busca o periférico com o ID fornecido no banco de dados.
        const periferico = await Periferico.findById(id);

        // Retorna o periférico encontrado com um status de sucesso (200).
        res.status(200).json({periferico});
    } catch(error) {
        // Se ocorrer um erro, retorna uma mensagem de erro com status 500.
        res.status(500).json({message: error.message});
    }
};

// Função para excluir um periférico específico com base no ID fornecido na requisição.
const deletePeriferico = async (req, res) => {
    try {
        // Extrai o ID do periférico da URL da requisição (req.params).
        const {id} = req.params;

        // Tenta excluir o periférico com o ID fornecido do banco de dados.
        const periferico = await Periferico.findByIdAndDelete(id);

        // Se o periférico não for encontrado, retorna uma mensagem de erro com status 404 (não encontrado).
        if (!periferico) {
            res.status(404).json({message: 'Periférico não encontrado'});
        } else {
            // Se o periférico for excluído com sucesso, retorna uma mensagem de sucesso com status 200.
            res.status(200).json({message: "Periférico deletado com sucesso"});
        }
    } catch(error) {
        // Se ocorrer um erro, retorna uma mensagem de erro com status 500.
        res.status(500).json({message: error.message});
    }
};

// Função para atualizar as informações de um periférico específico com base no ID fornecido na requisição.
const updatePeriferico = async (req, res) => {
    try {
        // Extrai o ID do periférico da URL da requisição (req.params).
        const {id} = req.params;

        // Atualiza o periférico com o ID fornecido com os novos dados enviados na requisição (req.body).
        const periferico = await Periferico.findByIdAndUpdate(id, req.body, { new: true });

        // Retorna o periférico atualizado com um status de sucesso (200).
        res.status(200).json(periferico);
        
    } catch(error) {
        // Se ocorrer um erro, retorna uma mensagem de erro com status 500.
        res.status(500).json({message: error.message});
    }
}

// Exporta todas as funções para que possam ser usadas em outras partes do programa.
module.exports = {addPeriferico, getAllPerifericos, getOnePeriferico, deletePeriferico, updatePeriferico };