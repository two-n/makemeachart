const { parse, makeViz } = require('./parse_n_viz')
const fs = require('fs')
const _ = require('lodash')

mocks = JSON.parse(fs.readFileSync('mocks.json', 'utf8'))

const runTest = (expected, actual) => {
	if (_.isEqual(expected, actual)) { 
		console.log( 'passing!') 
	} else { 
		console.log('failed') }
}

runTest(mocks.FoxNewsBusiness.array,parse(mocks.FoxNewsBusiness.text))
runTest(mocks.SpectatorIndex.array,parse(mocks.SpectatorIndex.text))
runTest(mocks.ArrestedLawyers.array,parse(mocks.ArrestedLawyers.text))
runTest(mocks.ThanksGivens.array,parse(mocks.ThanksGivens.text))