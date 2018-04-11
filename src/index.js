'use strict'

const document = require('global/document')
const snabbdom = require('snabbdom')
const attrsForSnabbdom = require('snabbdom/modules/attributes').default
const propsForSnabbdom = require('snabbdom/modules/props').default
const classForSnabbdom = require('snabbdom/modules/class').default
const styleForSnabbdom = require('snabbdom/modules/style').default
const eventsForSnabbdom = require('snabbdom/modules/eventlisteners').default
const h = require('snabbdom/h').default

const render = require('./ui')

const patch = snabbdom.init([
	attrsForSnabbdom,
	propsForSnabbdom,
	classForSnabbdom,
	styleForSnabbdom,
	eventsForSnabbdom,
])

const state = {
}

const actions = {
}

let tree = document.querySelector('#app')
const rerender = () => {
	const newTree = render(state, actions)
	patch(tree, newTree)
	tree = newTree
}

setTimeout(rerender, 0)
