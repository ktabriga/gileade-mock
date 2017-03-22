var express = require('express')
var router = express.Router()
const _ = require('lodash');
const moment = require('moment');

let index = 0;

function createReunioes(data) {
  return _.range(1).map(x => 10 + x * 5).map(x => ({
    nome: `${index++}: REUNIÃO ${data.month() + 1}`,
    dhInicio: data.clone().day(x).hours(8).toISOString(),
    dhFinal: data.clone().day(x).hours(12).toISOString(),
  }))

}

router.get("/api/pessoapre/:id/reunioes", (req, res) => {
  const {start=0, pageSize = 10} = req.query;
  const count = 100;

  const indexComeco = 0 > start*1 ? 0 : start*1
  const indexFim = (indexComeco*1 + pageSize*1) < count ? (indexComeco*1 + pageSize*1) : count

  const startOfMonth = moment().month(new Date().getMonth()).startOf('month')

  index = 0;
  const theValues = _.range(count)
    .map(x => {
      return startOfMonth.clone().add(x, 'months')
    })
    .map(createReunioes)

  res.json({
    "pageSize": pageSize,
    "count": count,
    "start": start,
    values: _.flatten(theValues).slice(indexComeco, indexFim)
  });

});

module.exports = router;
