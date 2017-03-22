var express = require('express')
var router = express.Router()

router.post('/api/visitante', (req, res) => {
  const data = req.body;
  validateToken(req, res) || res.json(data)
})

validateToken = function(req, res) {
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  return null;
}

module.exports = router;
