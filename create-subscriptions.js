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
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/subscriptions.json',
  oauth: auth.twitter_oauth,
  resolveWithFullResponse: true
}



request.get(request_options).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription added.')
  }
}).catch(function (response) {
  console.log('Subscription was not able to be added.')
  console.log('- Verify environment name.')
  console.log('- Verify "Read, Write and Access direct messages" is enabled on apps.twitter.com.')
  console.log('Full error message below:')
  console.log(response.error)
  // console.log(response)
})