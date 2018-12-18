const restful = require('node-restful')
const moment = require('moment'); 
const mongoose = restful.mongoose

const analyzeSchema = new mongoose.Schema({
    parameter1: { type: Number, required: [false, "Informe o valor do parâmetro 1!"] },
    parameter2: { type: Number, required: [false, "Informe o valor do parâmetro 2!"] },
    parameter3: { type: Number, required: [false, "Informe o valor do parâmetro 3!"] },
    parameter4: { type: Number, required: [false, "Informe o valor do parâmetro 4!"] },
    parameter5: { type: Number, required: [false, "Informe o valor do parâmetro 5!"] },
    points: { type: Number, value: "Bebida..", max:100, min:0, required: [false, "Informe a pontuação!"] },
    bebida: { type: String }, //INSERIR AS ESCALAS
    id_client: {type: String, required: false},
    analyzeCreatedAT: { type: String, default: moment().format('L')}

})

module.exports = restful.model('Analyze', analyzeSchema)