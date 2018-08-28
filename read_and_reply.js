const {scaleLinear} = require('d3-scale')
const {format} = require('d3-format')
const {ascending, max} = require('d3-array')

module.exports.read_and_reply = read_and_reply = (tweetEvent) => {
	console.log(tweetEvent)
	let parsed = parse(tweetEvent.tweet_create_events[0].text)
	makeViz(parsed)
	console.log(makeViz(parsed))
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