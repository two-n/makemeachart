require('dotenv').config()
const Twit = require('twit')

const { parse, makeViz } = require('./parse_n_viz')
 
var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
})

const stream = T.stream('user')

const tweetOut = (viz) => {
	T.post('statuses/update', { status: viz }, function(err, data, response) {
  	console.log(data)
	})
}

stream.on('tweet', function (msg) {
	if (msg.entities.user_mentions.length && msg.entities.user_mentions[0].screen_name === "makemeachart") {
		const data = parse(msg.text)
		const viz = makeViz(data)
		tweetOut(viz)
	}
})

