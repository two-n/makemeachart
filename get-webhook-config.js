require('dotenv').config()
const request = require('request-promise')

var auth = {}

// twitter info
auth.twitter_oauth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.ACCESS_TOKEN,
  token_secret: process.env.ACCESS_SECRET
}

// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/webhooks.json',
  oauth: auth.twitter_oauth
}




// GET request to retreive webhook config
request.get(request_options, function (error, response, body) {
  console.log(body)
})