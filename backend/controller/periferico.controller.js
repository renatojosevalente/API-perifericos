// Importa o modelo Periferico para interação com o banco de dados
const Periferico = require('../models/periferico.models.js');

// Adiciona um novo periférico ao banco de dados
const addPeriferico = async (req, res) => {
    try {
        // Desestrutura as informações do corpo da requisição, incluindo a imagem
        const { produtoNome, produtoTipo, modelo, marca, preco, caracteristicas, imagemUrl, quantidade } = req.body;

        // Cria e salva o novo periférico no banco de dados
        const periferico = await Periferico.create({ 
            produtoNome, 
            produtoTipo, 
            modelo, 
            marca, 
            preco, 
            caracteristicas,
            quantidade,
            imagemUrl  // Adiciona a URL da imagem
        });

        // Retorna o periférico criado com sucesso
        res.status(200).json({ message: "Periférico cadastrado com sucesso", periferico });
    } catch (error) {
        // Retorna erro em caso de falha
        res.status(500).json({ message: error.message });
    }
};

// Retorna todos os periféricos cadastrados
const getAllPerifericos = async (req, res) => {
    try {
        // Busca todos os periféricos no banco de dados
        const perifericos = await Periferico.find();

        // Retorna a lista de periféricos
        res.status(200).json({ message: "Lista de periféricos", perifericos });
    } catch (error) {
        // Retorna erro em caso de falha
        res.status(500).json({ message: error.message });
    }
};

// Retorna um periférico específico pelo ID
const getOnePeriferico = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca o periférico pelo ID
        const periferico = await Periferico.findById(id);

        if (!periferico) {
            return res.status(404).json({ message: 'Periférico não encontrado' });
        }

        // Retorna o periférico encontrado
        res.status(200).json({ message: "Periférico encontrado", periferico });
    } catch (error) {
        // Retorna erro em caso de falha
        res.status(500).json({ message: error.message });
    }
};

// Exclui um periférico pelo ID
const deletePeriferico = async (req, res) => {
    try {
        const { id } = req.params;

        // Exclui o periférico pelo ID
        const periferico = await Periferico.findByIdAndDelete(id);

        if (!periferico) {
            return res.status(404).json({ message: 'Periférico não encontrado' });
        }

        // Confirma a exclusão do periférico
        res.status(200).json({ message: "Periférico deletado com sucesso" });
    } catch (error) {
        // Retorna erro em caso de falha
        res.status(500).json({ message: error.message });
    }
};

// Atualiza um periférico pelo ID
const updatePeriferico = async (req, res) => {
    try {
        const { id } = req.params;

        // Atualiza as informações do periférico, incluindo a URL da imagem
        const periferico = await Periferico.findByIdAndUpdate(id, req.body, { new: true });

        if (!periferico) {
            return res.status(404).json({ message: 'Periférico não encontrado' });
        }

        // Retorna o periférico atualizado
        res.status(200).json({ message: "Periférico atualizado com sucesso", periferico });
    } catch (error) {
        // Retorna erro em caso de falha
        res.status(500).json({ message: error.message });
    }
};

// Exporta as funções para uso em outras partes da aplicação
module.exports = { addPeriferico, getAllPerifericos, getOnePeriferico, deletePeriferico, updatePeriferico };
