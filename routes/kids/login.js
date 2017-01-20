var express = require('express')
var router = express.Router()

users = [{
  "username": "teste@email.com",
  "password": "1234",
  "gumgaToken": "eternoGileade"
}]

router.post('/public/login', (req, res) => {
  // const {username, password} = req.body
  //
  // var found = users
  //   .filter((user) => user.username == username && user.password == password)
  //   .map((uu) => uu.gumgaToken)
  //
  // if(found.length < 1)
  //   return res.status('401').jsonp({error: 'user not found'})
  //
  // res.json({gumgaToken: found[0]})
  res.json({gumgaToken: 'eternoGileade'})
})

module.exports = router
