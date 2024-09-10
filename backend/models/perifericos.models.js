const mongoose = require('mongoose');
const { Schema } = mongoose;

const caracteristicaSchema = new Schema({
    cor: String,
    peso: Number
});

const perifericosSchema = new Schema({
    produtoTipo: String,
    modelo: String,
    marca: String,
    anoFabricacao: Number,
    caracteristicas: [caracteristicaSchema]
});

const Periferico = mongoose.model("Periferico", perifericosSchema);

module.exports = Periferico;