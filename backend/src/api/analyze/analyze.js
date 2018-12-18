const restful = require('node-restful')
const moment = require('moment'); 
const mongoose = restful.mongoose

const analyzeSchema = new mongoose.Schema({
    parameter1: { type: String, required: [false, "sdfdsfdsfdsf!"] },
    parameter2: { type: String, required: [false, "Informe o valor do parâmetro 2!"] },
    parameter3: { type: String, required: [false, "Informe o valor do parâmetro 3!"] },
    parameter4: { type: String, required: [false, "Informe o valor do parâmetro 4!"] },
    parameter5: { type: String, required: [false, "Informe o valor do parâmetro 5!"] },
    
    id_client: {type: String, required: false},
    analyzeCreatedAT: { type: String, default: moment().format('L')}

})

module.exports = restful.model('Analyze', analyzeSchema)