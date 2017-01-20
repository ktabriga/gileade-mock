var express = require('express')
var router = express.Router()
var _ = require('lodash')
const fotos = require('./fotos')

let pessoas = 
[{
    "id": 1020,
    "oi" : {"value": "10."},
    "nome": "João Paulo Pedro Barbosa",
    "apelido": "Joãozinho",
    "alergias": "Amendoim",
    "sexo": "MASCULINO",
    "dataNascimento": "2016-11-16T19:35:21.056Z",
    "saude": "Muito boa",
    "observacao": "Medo de Palhaço",
    "origem": "APP_KIDS_PAIS",
    "type": "PessoaPre",
    "fotoBase64": fotos.boy,
  },
  {
    "id": 1021,
    "oi" : {"value": "10."},
    "nome": "Agatha Evelyn Castro Barbosa",
    "apelido": "Eve",
    "alergias": "Nenhuma",
    "sexo": "MASCULINO",
    "dataNascimento": "1999-12-25T19:35:21.056Z",
    "saude": "Tem rinite",
    "observacao": "Come cola se deixar",
    "origem": "APP_KIDS_PAIS",
    "type": "PessoaPre",
    "fotoBase64": fotos.girl
  },
  {
    "id": 1019,
    "oi" : {"value": "10."},
    "nome": "Filipe Diogo Rodrigues Barbosa",
    "apelido": "Felipão",
    "sexo": "MASCULINO",
    "dataNascimento": "1979-12-25T19:35:21.056Z",
    "email": "fdb@email.com",
    "estadoCivil": "Casado",
    "cpf": "63424386090",
    "cep": "60511746",
    "uf": "Pr",
    "cidade": "Maringá",
    "bairro": "Zona 7",
    "numero": "123",
    "complemento": "Proximo a UEM",
    "logradouro": "Um Logradouro Qualquer",
    "origem": "APP_KIDS_PAIS",
    "type": "PessoaPre",
    "fotoBase64": fotos.man
  },
  {
    "id": 1022,
    "oi" : {"value": "10."},
    "nome": "Mariana Hadassa Barbosa",
    "apelido": "Mari",
    "sexo": "FEMININO",
    "dataNascimento": "1985-10-12T19:35:21.056Z",
    "email": "maribarbosa@email.com",
    "estadoCivil": "Casado",
    "cpf": "96595216930",
    "cep": "59092310",
    "uf": "Pr",
    "cidade": "Maringá",
    "bairro": "Zona 7",
    "numero": "123",
    "complemento": "Proximo a UEM",
    "logradouro": "Um Logradouro Qualquer",
    "origem": "APP_KIDS_PAIS",
    "type": "PessoaPre",
    "fotoBase64": fotos.woman
  },
  {
    "id": 1023,
    "oi" : {"value": "10."},
    "nome": "Marina Olivia Beatriz Gomes Barbosa",
    "apelido": "Marina",
    "sexo": "FEMININO",
    "dataNascimento": "1985-10-12T19:35:21.056Z",
    "email": "merinaolbarbosa@email.com",
    "estadoCivil": "Viuva",
    "cpf": "25901203461",
    "cep": "49001252",
    "uf": "Pr",
    "cidade": "Maringá",
    "bairro": "Zona 7",
    "numero": "123",
    "complemento": "Proximo a UEM",
    "logradouro": "Um Logradouro Qualquer",
    "origem": "APP_KIDS_PAIS",
    "type": "PessoaPre",
    "fotoBase64": fotos.oldwoman
  }
]

router.get('/api/pessoapre', (req, res) => {
  validateToken(req, res) || res.json(pessoas)
})

router.get('/api/pessoapre/:id', (req, res) => {
  const id  = req.params.id
  validateToken(req, res) || res.json(pessoas.filter((p) => p.id == id)[0])
})

router.post('/api/pessoapre', (req, res) => {
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

router.put('/api/pessoapre/:id', (req, res) => {
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
