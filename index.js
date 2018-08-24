require('dotenv').config()

// const { parse, makeViz } = require('./parse_n_viz')
const crypto = require('crypto')
const request = require('request-promise')
const express = require('express')

const app = express()
app.set('port', (process.env.PORT || 5000))

const auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.ACCESS_TOKEN,
  token_secret: process.env.ACCESS_SECRET
}

get_challenge_response = function(crc_token, consumer_secret) {
	hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')
	return hmac
}

/** Receives challenge response check (CRC) **/
app.get('/webhook/twitter', function(request, response) {
  var crc_token = request.query.crc_token
  if (crc_token) {
    var hash = get_challenge_response(crc_token, auth.consumer_secret)

    response.status(200);
    response.send({
      response_token: 'sha256=' + hash
    })
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.')
  }
})

/** Subscription management **/
app.get('/subscriptions', function(request, response) {
	console.log(request)
})

/** listen **/
const server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})


/** Serves the home page **/
app.get('/', function(request, response) {
  response.send('App is running')
})



