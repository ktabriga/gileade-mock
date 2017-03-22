var express = require('express')
var router = express.Router()
var _ = require('lodash')
const fotos = require('./fotos')

const pessoas = require('../../models/pessoas').map(pessoa =>
  Object.assign(pessoa, {administrador: !pessoa.alergias})
);

router.get('/api/pessoa', (req, res) => {
  const unescaped = unescape(req.param('aq'));
  const regex = /'%(.*?)%'/;
  const matched = (unescaped.match(regex) && unescaped.match(regex)[1]) || '';
  validateToken(req, res) || res.json(
    pessoas.filter(element => element.nome.toUpperCase().includes(matched.toUpperCase()))
  )
  //validateToken(req, res) || res.json(pessoas)
})

router.get('/api/pessoa/:id', (req, res) => {
  const id  = req.params.id
  validateToken(req, res) || res.json(pessoas.filter((p) => p.id == id)[0])
})

router.post('/api/pessoa', (req, res) => {
  var b = req.body

  var ids = pessoas.map(p => p.id)
  var nextId = Math.max(...ids) + 1

  console.log('POST ' + nextId + ':')
  console.log(b)

  b.id = nextId
  b.oi = {"value": "10."}

  pessoas.push(b)
  res.json(b)
})

router.put('/api/pessoa/:id', (req, res) => {
  const b = req.body
  const toRemove = req.params.id

  console.log('PUT ' + toRemove + ':')
  console.log(b)

  _.remove(pessoas, function(i){return i.id == toRemove})
  pessoas.push(b)
  res.json(b)
})

validateToken = function(req, res) {
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  return null;
}
module.exports = router;
