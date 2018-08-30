const {scaleLinear} = require('d3-scale')
const {format} = require('d3-format')
const {ascending, max} = require('d3-array')

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

const parse = (text) => {
	const data = text.split('\n').filter(e => e.slice(0,4).search(/\d{4}/) === 0)
	const delimeter = data[0][4]
	const parsed = [...data].map(d => d.split(delimeter).map(e => +e.trim().replace(/[^\.\d]+/g,''))) //.filter(f => !isNaN(f[1])).sort((a,b) => ascending(a[0], b[0]))
	return parsed
}

const makeViz = (data) => {

	const xScale = scaleLinear()
    .domain([data[0][0], data[data.length-1][0]])
    .range([0, 10])
	const xTicks = xScale.ticks( data.length/2 ).map(d => d.toString().slice(2,4))

	const makeVizRow = (values, init='') => {
		if(values.length === 0){
		    return init
		} else {
		    return makeVizRow(values.slice(1), init+'\u3000'.repeat(Math.max(0, xScale(values[0][0]) - init.length))+'\uff0a')
		}
	}

	const yScale = scaleLinear().domain([max(data, d => d[1]), 0])
	const yTicks = yScale.ticks( data.length/2 )
	const yStep = yTicks[0] - yTicks[1]

	const xStep = Math.round(xScale.range()[1] / xTicks.length) - 2
	let viz = yTicks.map(e => {
	  let filtered = data.filter(d => d[1] >= +e && d[1] < +e + yStep)
	  return `${format('.2s')(e)}| ${makeVizRow(filtered)}`
	}).join('\n')
	viz += '\n' + '\u3000'.repeat(2) + xScale.domain()[0].toString().slice(2,4) + '\uffe3'.repeat(xScale.range()[1]) + xScale.domain()[1].toString().slice(2,4)

	return viz
}

module.exports.read_and_reply = read_and_reply = (tweetEvent) => {

	let id = tweetEvent.tweet_create_events[0].id_str
	let user = tweetEvent.tweet_create_events[0].user.screen_name
	console.log(tweetEvent.tweet_create_events[0].text)
	console.log(parse(tweetEvent.tweet_create_events[0].text))
	let tweet = '@' + user + ' ' + makeViz(parse(tweetEvent.tweet_create_events[0].text))

	// request options
	const request_options = {
	  oauth: auth.twitter_oauth,
	  url: 'https://api.twitter.com/1.1/statuses/update.json?status=' + encodeURIComponent(tweet) + '&in_reply_to_status_id=' + id,
	}

	// POST request to tweet
	request.post(request_options).then(function (body) {
	  console.log(body)
	}).catch(function (body) {
	  console.log(body)
	})

}