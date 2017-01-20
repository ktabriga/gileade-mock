var express = require('express')
var router = express.Router()
const fotos = require('./fotos')

router.post('/public/usuario', (req, res) => {
  console.log(req.body)
  res.json(responseToken)
})

router.get('/api/usuario/familia', (req, res) => {
  console.log(req.headers.gumgatoken)
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });

  res.json(familia)
})

module.exports = router

let responseToken =
{
    "gumgaToken": "eternoGileade"
}

let familia =
{
  "id": 300,
  "oi" : {"value" : "10."},
  "descricao": "Barbosa",
  "fotoBase64": fotos.familia2,
  "membros": [
    {
      "id": 1019,
      "oi" : {"value": "10."},
      "nome": "Filipe Diogo Rodrigues Barbosa",
      "parentesco": "Pai",
      "administrador": true,
      "fotoBase64": fotos.man
    },
    {
      "id": 1020,
      "oi" : {"value": "10."},
      "nome": "João Paulo Pedro Barbosa",
      "parentesco": "Filho",
      "administrador": false,
      "fotoBase64": fotos.boy
    },
    {
      "id": 1021,
      "oi" : {"value": "10."},
      "nome": "Agatha Evelyn Castro Barbosa",
      "parentesco": "Filho",
      "administrador": false,
      "fotoBase64": fotos.girl
    },
    {
      "id": 1022,
      "oi" : {"value": "10."},
      "nome": "Mariana Hadassa Barbosa",
      "parentesco": "Mãe",
      "administrador": true,
      "fotoBase64": fotos.woman
    },
    {
      "id": 1023,
      "oi" : {"value": "10."},
      "nome": "Marina Olivia Beatriz Gomes Barbosa",
      "parentesco": "Avó",
      "administrador": true,
      "fotoBase64": fotos.oldwoman
    }

  ]
}
