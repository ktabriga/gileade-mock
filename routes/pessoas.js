const express = require('express');
const router = express.Router();
const pessoas = require('../models/pessoas');

const users = [{
  user: 'maria@email.com',
  password: '1234'
}, {
  user: 'pedro@email.com',
  password: '1234'
}, {
  user: 'joana@email.com',
  password: '1234'
}];
let lastId = 3;

router.post('/auth', (req, res) => {
  const { user, password} = req.body;
  console.log(user, password)
  const userFound = users.filter((p) => p.user === user && p.password === password)[0];
  if (!userFound) {
    return res.status(401)
      .send('invalid user or password');
  }
  res.json({
    token: 'abcdef'
  });
})

router.get('/pessoas', (req, res) => {
  console.log(req.headers)
  res.json(pessoas);
});

router.get('/pessoas/aniversariantes', (req, res) => {
  res.json(pessoas);
})

router.get('/pessoas/:id', (req, res) => {
  const id = req.params.id;
  res.json(pessoas.filter((p) => p.id == id || p.user === id)[0]);
})

router.post('/pessoas', (req, res) => {
  const pessoa = req.body;
  users.push({
    user: pessoa.email,
    password: '1234'
  });
  pessoa.id = ++lastId;
  pessoas.push(req.body);
  res.json(pessoa);
});

router.put('/pessoas', (req, res) => {
  pessoas = pessoas.filter((p) => p.id != req.body.id);
  pessoas.push(req.body);
  res.json(req.body);
});

module.exports = router;
