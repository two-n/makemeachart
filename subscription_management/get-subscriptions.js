require('dotenv').config()
const request = require('request-promise')

var auth = {}

// twitter info
auth.twitter_oauth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.USER_TOKEN, // USER SPECIFIC
  token_secret: process.env.USER_TOKEN_SECRET, // USER SPECIFIC
}

// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/subscriptions.json',
  oauth: auth.twitter_oauth,
  resolveWithFullResponse: true
}


// GET request to retrieve webhook config
request.get(request_options).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription exists for user.')
  }
}).catch(function (response) {
  console.log('HTTP response code:', response.statusCode)
  console.log('Incorrect environment name or subscription for user does not exist.')
  console.log(response.error)
})