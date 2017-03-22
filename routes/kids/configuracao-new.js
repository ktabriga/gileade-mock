var express = require('express')
var router = express.Router()

const familias = require('../../models/familias');

router.get('/api/configuracao', (req, res) => {
  validateToken(req, res) || res.json(familias)
})

validateToken = function(req, res) {
  if(req.headers.gumgatoken != 'eternoGileade')
    return res.status(500).jsonp({ error: 'invalidToken' });
  return null;
}

module.exports = router;
