require('dotenv').config()

const { parse, makeViz } = require('./parse_n_viz')
const crypto = require('crypto')
const request = require('request-promise')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.PORT || 5000))

const auth = {}

// twitter info
auth.twitter_oauth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.USER_TOKEN, // USER SPECIFIC
  token_secret: process.env.USER_TOKEN_SECRET, // USER SPECIFIC
}

auth.get_twitter_bearer_token = function () {

  // just return the bearer token if we already have one
  if (auth.twitter_bearer_token) {
    return new Promise (function (resolve, reject) {
      resolve(auth.twitter_bearer_token)
    })
  }

  // construct request for bearer token
  var request_options = {
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    auth: {
      user: auth.twitter_oauth.consumer_key,
      pass: auth.twitter_oauth.consumer_secret
    },
    form: {
      'grant_type': 'client_credentials'
    }
  }

  return new Promise (function (resolve, reject) {
    request(request_options, function(error, response) {
      if (error) {
        reject(error)
      }
      else {
        var json_body = JSON.parse(response.body)
        console.log("Bearer Token:", json_body.access_token)
        auth.twitter_bearer_token = json_body.access_token
        resolve(auth.twitter_bearer_token)
      }
    })
  })
}


get_challenge_response = function(crc_token, consumer_secret) {
	hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')
	return hmac
}

/** Receives challenge response check (CRC) **/
app.get('/webhook/twitter', function(request, response) {
  var crc_token = request.query.crc_token
  if (crc_token) {
    var hash = get_challenge_response(crc_token, auth.twitter_oauth.consumer_secret)

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
  var crc_token = request.query.crc_token
  if (crc_token) {
    var hash = get_challenge_response(crc_token, auth.twitter_oauth.consumer_secret)

    response.status(200);
    response.send({
      response_token: 'sha256=' + hash
    })
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.')
  }
})

// post the activity
app.post('/webhook/twitter', function(request, response) { 

  let parsed = parse(request.body.tweet_create_events[0].text)
  let user = request.body.tweet_create_events[0].user.screen_name
  // let tweet = 'Test%20tweet%20using%20the%20POST%20statuses%2Fupdate%20endpoint'
  let tweet = makeViz(parsed)

  console.log(parsed)
  console.log(user)
  console.log(tweet)

  // request options
  const request_options = {
    url: 'https://api.twitter.com/1.1/statuses/update.json?status=' + tweet + 'in_reply_to_status_id=@' + user,
    oauth: auth.twitter_oauth,
    headers: {
      'Content-type': 'application/json'
    }
  }

  // POST request to tweet
  request.post(request_options).then(function (body) {
    console.log(body)
  }).catch(function (body) {
    console.log(body)
  })

  response.send('200 OK')
})

/** listen **/
const server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})


/** Serves the home page **/
app.get('/', function(request, response) {
  response.send('App is running')
})

// app.get('/activity', function(request, response) {

// })




