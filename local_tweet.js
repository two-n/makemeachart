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

const tweet = '@ellie56002005 Test reply tweet'

// request options
const request_options = {
  // headers: {
  //   'content-type': 'application/json'
  // },
  oauth: auth.twitter_oauth,
  // url: 'https://api.twitter.com/1.1/statuses/update.json?in_reply_to_status_id=' + id + '&status=' + encodeURIComponent(tweet),
  url: 'https://api.twitter.com/1.1/statuses/update.json?status=' + encodeURIComponent(tweet) + '&in_reply_to_status_id=1035207686646771712',
}

// POST request to tweet
request.post(request_options).then(function (body) {
  console.log(body)
}).catch(function (body) {
  console.log(body)
})