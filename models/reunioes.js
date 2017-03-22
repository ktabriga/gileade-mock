const moment = require('moment');

const reunioes = [{
  title: "Dezembro",
  values: [
    {
      id: 1,
      nome: "ATIVIDADE EXEMPLO",
      dhInicio: new Date(),
      dhFinal: new Date()
    },
    {
      id: 2,
      nome: "ATIVIDADE EXEMPLO TAMBÉM",
      dhInicio: new Date(),
      dhFinal: new Date()
    },
    {
      id: 3,
      nome: "MAIS UMA ATIVIDADE EXEMPLO",
      dhInicio: new Date(),
      dhFinal: new Date()
    }
  ]
},{
  title: "Novembro",
  values: [
    {
      id: 3,
      nome: "ATIVIDADE EXEMPLO",
      dhInicio: new Date(),
      dhFinal: new Date()
    }
  ]
}]

module.exports = reunioes;
