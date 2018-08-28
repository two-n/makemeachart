require('dotenv').config()
const request = require('request-promise')

const auth = {}

// twitter info
auth.twitter_oauth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.USER_TOKEN, // USER SPECIFIC
  token_secret: process.env.USER_TOKEN_SECRET, // USER SPECIFIC
}


// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/webhooks.json',
  oauth: auth.twitter_oauth
}


// GET request to retreive webhook config
request.get(request_options).then( function (body) {
  // parse webhook ID
  var webhook_id = JSON.parse(body)[0].id

  console.log('Deleting webhook config:', webhook_id)

  // update request options for delete endpoint
  request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/all/dev/webhooks/' + webhook_id + '.json',
    oauth: auth.twitter_oauth,
    resolveWithFullResponse: true
  }

  // DELETE request to delete webhook config
  return request.delete(request_options)

}).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Webhook config deleted.')
  }
}).catch(function (response) {
  console.log('HTTP response code:', response.statusCode)
  console.log('Error deleting webhook config.')
})