// Importa o módulo `mongoose`, que é uma biblioteca para interagir com o MongoDB.
const mongoose = require('mongoose');

// Extrai o objeto `Schema` do módulo `mongoose`, que é usado para definir a estrutura dos dados.
const { Schema } = mongoose;

const dimensoesSchema = new Schema({
    altura:Number,
    largura:Number,
    comprimento:Number
})

// Define um esquema para as características dos periféricos. Este esquema descreve como as características devem ser armazenadas.
const caracteristicaSchema = new Schema({
    cor: String,      // A cor do periférico, armazenada como uma string.
    peso: Number,      // O peso do periférico, armazenado como um número.
    dimensao:[dimensoesSchema]
});



// Define o esquema principal para os periféricos. Este esquema descreve como as informações do periférico devem ser armazenadas.
const perifericosSchema = new Schema({
    produtoTipo: String,        // Tipo do produto (por exemplo, teclado, mouse), armazenado como uma string.
    modelo: String,             // Modelo do periférico, armazenado como uma string.
    marca: String,              // Marca do periférico, armazenada como uma string.
    price:Number,               
    caracteristicas: [caracteristicaSchema]  // Uma lista de características associadas ao periférico, usando o esquema de características definido acima.
});

// Cria um modelo de dados chamado "Periferico" baseado no esquema de periféricos. O modelo é usado para interagir com a coleção de periféricos no banco de dados.
const Periferico = mongoose.model("Periferico", perifericosSchema);

// Exporta o modelo `Periferico` para que possa ser usado em outras partes do programa.
module.exports = Periferico;
