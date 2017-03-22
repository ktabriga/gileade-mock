var express = require('express')
var router = express.Router()
const fotos = require('./fotos')

router.post('/public/usuario', (req, res) => {
  console.log(req.body)
  res.json(responseToken)
})

router.get('/api/usuario/familia/:id', (req, res) => {
  console.log(req.headers.gumgatoken)

  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });

  res.json(Object.assign({},
    familia,
    {descricao: familia.descricao + ' ' + req.params.id }
  ));
})

router.delete('/api/usuario/familia/:idFamilia/membro/:idMembro', (req, res) => {
  console.log(req.headers.gumgatoken)

  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });

  familia.membros = familia.membros.filter(membro => membro.id != req.params.idMembro)

  res.json({ok: true})
})

router.get('/api/usuario/configuracao', (req, res) => {

  console.log(req.headers.gumgatoken)
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  res.json({id: 1019, nome: "Usuário Logado da Silva"});
})

router.get('/api/usuario/familias', (req, res) => {

  console.log(req.headers.gumgatoken)
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  res.json(configFamilias);
})

router.get('/api/familia', (req, res) => {
  const unescaped = unescape(req.param('aq'));
  const regex = /'%(.*?)%'/;
  const matched = (unescaped.match(regex) && unescaped.match(regex)[1]) || '';
  validateToken(req, res) || res.json(
    familias.filter(element => element.descricao.toUpperCase().includes(matched.toUpperCase()))
  )
  //validateToken(req, res) || res.json(pessoas)
})

module.exports = router

let responseToken =
{
    "gumgaToken": "eternoGileade"
}

const configFamilias = [
  {
    id: 1,
    descricao: 'Barbosa 1',
    foto: 'https://i.imgur.com/PEUXT63.jpg'
  },
  {
    id: 2,
    descricao: 'Barbosa 2',
    foto: 'https://i.imgur.com/TQVzNoU.jpg'
  },
]

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

let familias = [familia];
