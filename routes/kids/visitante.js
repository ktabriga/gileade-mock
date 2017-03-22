var express = require('express')
var router = express.Router()

router.post('/api/visitante', (req, res) => {
  const data = req.body;

  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });

  res.json(data)
})

module.exports = router
