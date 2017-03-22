const express = require('express')
const router = express.Router()

const pessoas = require('../../models/pessoas');

router.get('/api/aniversariantes', (req, res) => {
  validateToken(req, res) || res.json(pessoas)
})

router.get('/api/ausentes', (req, res) => {
  validateToken(req, res) || res.json(pessoas)
})

router.get('/api/frequencia', (req, res) => {
  validateToken(req, res) || res.json({chave: 'valor'})
})

validateToken = function(req, res) {
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  return null;
}

module.exports = router;
