const {scaleLinear} = require('d3-scale')
const {format} = require('d3-format')
const {ascending, max} = require('d3-array')

require('dotenv').config()
const request = require('request-promise')

const auth = {}

const tweetEvent = 
{ for_user_id: '1031985269984165889',
   tweet_create_events: 
    [ { created_at: 'Tue Aug 28 19:02:13 +0000 2018',
        id: 1034516518669770800,
        id_str: '1034516518669770752',
        text: '. @makemeachart \n2018: 500 \n2017: 400 \n2016: 300 \n2014: 200 \n2013: 154',
        source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
        truncated: false,
        in_reply_to_status_id: null,
        in_reply_to_status_id_str: null,
        in_reply_to_user_id: null,
        in_reply_to_user_id_str: null,
        in_reply_to_screen_name: null,
        user: { id: 1034242583717793800,
		   id_str: '1034242583717793793',
		   name: 'ellie',
		   screen_name: 'ellie56002005',
		   location: null,
		   url: null,
		   description: null,
		   translator_type: 'none',
		   protected: false,
		   verified: false,
		   followers_count: 0,
		   friends_count: 1,
		   listed_count: 0,
		   favourites_count: 1,
		   statuses_count: 19,
		   created_at: 'Tue Aug 28 00:53:42 +0000 2018',
		   utc_offset: null,
		   time_zone: null,
		   geo_enabled: false,
		   lang: 'en',
		   contributors_enabled: false,
		   is_translator: false,
		   profile_background_color: 'F5F8FA',
		   profile_background_image_url: '',
		   profile_background_image_url_https: '',
		   profile_background_tile: false,
		   profile_link_color: '1DA1F2',
		   profile_sidebar_border_color: 'C0DEED',
		   profile_sidebar_fill_color: 'DDEEF6',
		   profile_text_color: '333333',
		   profile_use_background_image: true,
		   profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
		   profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
		   default_profile: true,
		   default_profile_image: false,
		   following: null,
		   follow_request_sent: null,
		   notifications: null },
        geo: null,
        coordinates: null,
        place: null,
        contributors: null,
        is_quote_status: false,
        quote_count: 0,
        reply_count: 0,
        retweet_count: 0,
        favorite_count: 0,
        entities: [Object],
        favorited: false,
        retweeted: false,
        filter_level: 'low',
        lang: 'und',
        timestamp_ms: '1535482933095' } 
    ] 
}
 

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

// module.exports.read_and_reply = read_and_reply = (tweetEvent) => {
read_and_reply = (tweetEvent) => {

	let parsed = parse(tweetEvent.tweet_create_events[0].text)
	let user = tweetEvent.tweet_create_events[0].user.screen_name
	let tweet = 'Test%20tweet%20using%20the%20POST%20statuses%2Fupdate%20endpoint'
	// let tweet = makeViz(parsed)
	
	// request options
	const request_options = {
	  url: 'https://api.twitter.com/1.1/statuses/update.json?status=' + tweet + 'in_reply_to_status_id=@' + user,
	  oauth: auth.twitter_oauth,
	  headers: {
	    'Content-type': 'application/json'
	  }
	}

	// POST request to create webhook config
	// request.post(request_options).then(function (body) {
	//   console.log(body)
	// }).catch(function (body) {
	//   console.log(body)
	// })
	
	
	console.log(makeViz(parsed))
	console.log(request_options)
}

read_and_reply(tweetEvent)
