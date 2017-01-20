var express = require('express')
var router = express.Router()
const _ = require('lodash');
const moment = require('moment');

function createReunioes(data) {
  return _.range(3).map(x => 10 + x * 5).map(x => ({
    nome: `REUNIÃO ${data.month() + 1}`,
    dhInicio: data.clone().day(x).hours(8).toISOString(),
    dhFinal: data.clone().day(x).hours(12).toISOString(),
  }))

}

router.get("/api/pessoapre/:id/reunioes", (req, res) => {
  let {startMonth, count = 1} = req.query;
  if (startMonth) {
    startMonth = startMonth -1;
  } else {
     startMonth = new Date().getMonth()
  }
  
  if(startMonth < 0)
    return res.json({value: []})
  const start = moment().month(startMonth).startOf('month');

  const theValues = _.range(count)
    .map(x => {
      return start.clone().add(x, 'months')
    })
    .map(createReunioes)

  //theValues.push({
  //    nome: `REUNIÃO HOJE`,
  //    dhInicio: new Date().toISOString(),
  //    dhFinal: moment(new Date()).endOf('day').toISOString()
  //  })

  onlyOne = [
    {
    nome: `REUNIÃO PASSADA 1 HR`,
    dhInicio: moment(new Date()).subtract(2, 'hour').toISOString(),
    dhFinal: moment(new Date()).subtract(1, 'hour').toISOString()
    },
    {
    nome: `REUNIÃO ANDAMENTO`,
    dhInicio: new Date().toISOString(),
    dhFinal: moment(new Date()).add(2, 'hour').toISOString(),
    },
    {
    nome: `REUNIÃO FUTURO 4 HR`,
    dhInicio: moment(new Date()).add(4, 'hour').toISOString(),
    dhFinal: moment(new Date()).add(6, 'hour').toISOString()
    }
  ]

  res.json({values: _.flatten(theValues)});
});

module.exports = router;
