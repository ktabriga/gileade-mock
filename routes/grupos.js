var express = require('express');
var router = express.Router();
const pessoas = require('../models/pessoas');
const grupos = require('../models/grupos');
const _ = require('lodash');
const moment = require('moment');

let lastId = 2;

let pessoasGrupos = [{
  grupo: grupos[0],
  pessoa: pessoas[0],
  funcao: {
    descricao: 'PROFESSOR'
  },
  tipo: 'LIDER',
  adm: true
}, {
  grupo: grupos[0],
  pessoa: pessoas[1],
  funcao: {
    descricao: 'CANTOR'
  },
  tipo: 'PARTICIPANTE',
  adm: false
}, {
  grupo: grupos[0],
  pessoa: pessoas[2],
  funcao: {
    descricao: 'TESOREIRO'
  },
  tipo: 'PARTICIPANTE',
}];

router.get('/grupos', (req, res) => {
  res.json(grupos);
});

router.post('/grupos', (req, res) => {
  const grupo = req.body;
  grupo.id = ++lastId;
  grupos.push(grupo);
  res.json(grupo);
});

router.get('/grupos/:id', (req, res) => {
  res.json(grupos.filter((g) => g.id == req.params.id)[0]);
});

router.get('/pessoas-grupos', (req, res) => {
  res.json(pessoasGrupos);
});

router.post('/pessoas-grupos', (req, res) => {
  pessoasGrupos.push(req.body);
  res.json(req.body);
});

router.delete('/pessoas-grupos', (req, res) => {
  const {grupoId, pessoaId} = req.body;
  pessoasGrupos = pessoasGrupos.filter((pg) => pg.grupoId != grupoId && pg.pessoaId != pessoaId);
  res.end();
});

function createReunioes(data) {
  return _.range(3).map(x => 10 + x * 5).map(x => ({
    nome: `REUNIÃO ${data.month() + 1}`,
    dhInicio: data.clone().day(x).hours(8).toISOString(),
    dhFinal: data.clone().day(x).hours(12).toISOString(),
  }))
}

router.get("/grupos/:id/reunioes", (req, res) => {
  let {startMonth, count = 1} = req.query;
  if (startMonth) {
    startMonth = startMonth -1;
  } else {
     startMonth = new Date().getMonth()
  }
  const start = moment().month(startMonth).startOf('month');

  res.json(
      {
        values: _.flatten(_.range(count)
          .map(x => {
            return start.clone().add(x, 'months')
          })
          .map(createReunioes))
      }
  );

//  res.json(_.range(startMonth, startMonth + count).map(createReunioes));
});

module.exports = router;
