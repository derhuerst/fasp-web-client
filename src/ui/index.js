'use strict'

const h = require('snabbdom/h').default

const render = (state, actions) => {
	return h('div#app', {}, [
		// todo
		h('button', {on: {
			click: () => actions.queue('http://jannis-mac.local:2000/audio/musik/lib/Beirut/No%20No%20No/01-01%20Gibraltar.m4a')
		}}, ['play sth'])
	])
}

module.exports = render
