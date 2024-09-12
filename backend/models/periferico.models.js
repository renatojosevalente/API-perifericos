// Importa o mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Desestrutura o objeto Schema do mongoose
const { Schema } = mongoose;

// Define o esquema para as dimensões de um periférico
const dimensoesSchema = new Schema({
    altura: Number,
    largura: Number,
    comprimento: Number
});

// Define o esquema para as características de um periférico
const caracteristicaSchema = new Schema({
    cor: String,
    peso: Number,
    dimensao: [dimensoesSchema]  // Inclui as dimensões dentro das características
});

// Define o esquema principal para um periférico
const perifericosSchema = new Schema({
    produtoNome: String,
    produtoTipo: String,
    modelo: String,
    marca: String,
    preco: Number,
    caracteristicas: [caracteristicaSchema]  // Lista de características do periférico
});

// Cria o modelo Periferico baseado no esquema definido
const Periferico = mongoose.model("Periferico", perifericosSchema);

// Exporta o modelo para ser utilizado em outras partes da aplicação
module.exports = Periferico;