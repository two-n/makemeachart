require('dotenv').config()
const request = require('request-promise')

var auth = {}

// twitter info
auth.twitter_oauth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.USER_TOKEN, // USER SPECIFIC
  token_secret: process.env.USER_TOKEN_SECRET, // USER SPECIFIC
  nonce: process.env.OAUTH_NONCE,
}

//request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/subscriptions.json',
  oauth: auth.twitter_oauth,
  resolveWithFullResponse: true
}

console.log(request_options)


request.post(request_options, function (error, response, body) {
  console.log(body)
}).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription added.')
  }
}).catch(function (response) {
  console.log('Full error message below:')
  console.log(response.error)
})