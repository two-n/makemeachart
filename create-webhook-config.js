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
  oauth: auth.twitter_oauth,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  form: {
    url: 'https://makemeachart.herokuapp.com/webhook/twitter'
  }
}

// POST request to create webhook config
request.post(request_options).then(function (body) {
  console.log(body)
}).catch(function (body) {
  console.log(body)
})