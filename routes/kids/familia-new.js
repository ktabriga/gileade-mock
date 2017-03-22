const express = require('express')
const router = express.Router()

const fotos = require('./fotos')

const pessoas = require('../../models/pessoas');

router.get('/api/familia/:id', (req, res) => {
  validateToken(req, res) || res.json(familia)
})

router.get('/api/familia', (req, res) => {
  const unescaped = unescape(req.param('aq'));
  const regex = /'%(.*?)%'/;
  const matched = (unescaped.match(regex) && unescaped.match(regex)[1]) || '';
  validateToken(req, res) || res.json(
    familias.filter(element => element.descricao.toUpperCase().includes(matched.toUpperCase()))
  )
})

validateToken = function(req, res) {
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  return null;
}

const familia = {
  "id": 300,
  "oi" : {"value" : "10."},
  "descricao": "Barbosa",
  "fotoBase64": fotos.familia2,
  "membros": pessoas
}

const familias = [familia]
module.exports = router;
