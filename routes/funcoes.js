var express = require('express');
var router = express.Router();

const funcoes = [{
  id: 1,
  descricao: 'Pedreiro'
}, {
  id: 2,
  descricao: 'Pintor'
}, {
  id: 3,
  descricao: 'Programador'
}];

router.get('/funcoes', (req, res) => res.json(funcoes));
