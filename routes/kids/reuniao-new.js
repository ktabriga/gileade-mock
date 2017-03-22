var express = require('express')
var router = express.Router()

const reunioes = require('../../models/reunioes');
const pessoas = require('../../models/pessoas');

router.get("/api/reuniao", (req, res) => {
  validateToken(req, res) || res.json(reunioes);
});

router.get("/api/reuniao/:id", (req, res) => {
  validateToken(req, res) || res.json(getReuniao(reunioes));
});

router.post("/api/reuniao/", (req, res) => {
  validateToken(req, res) || res.json(getReuniao(reunioes));
});

router.put("/api/reuniao/:id", (req, res) => {
  validateToken(req, res) || res.json(getReuniao(reunioes));
});

validateToken = function(req, res) {
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  return null;
}

function getReuniao(reunioes){
  return Object.assign({}, (reunioes[0].values[0]), {participantes: pessoas})
}

module.exports = router;
