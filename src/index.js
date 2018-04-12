'use strict'

const document = require('global/document')
const snabbdom = require('snabbdom')
const attrsForSnabbdom = require('snabbdom/modules/attributes').default
const propsForSnabbdom = require('snabbdom/modules/props').default
const classForSnabbdom = require('snabbdom/modules/class').default
const styleForSnabbdom = require('snabbdom/modules/style').default
const eventsForSnabbdom = require('snabbdom/modules/eventlisteners').default
const h = require('snabbdom/h').default
const createClient = require('fasp-client')

const render = require('./ui')

const patch = snabbdom.init([
	attrsForSnabbdom,
	propsForSnabbdom,
	classForSnabbdom,
	styleForSnabbdom,
	eventsForSnabbdom,
])

// state

const state = {
	// todo: fetch data
	receiverUrl: null,
	receiver: null,

	addDialogOpen: false,
	props: {
		filename: null,
		path: null,
		duration: null,
		progress: null,
		pause: null,
		volume: null,
		metadata: {},
		artwork: null
	}
}

// actions

const onProp = (prop, val) => {
	if (prop === 'time-pos') prop = 'progress'
	state.props[prop] = val
	rerender()
}

const connectTo = (url) => {
	// todo: parse & normalize url
	if (url === state.receiverUrl) return null
	if (state.receiver) state.receiver.close()
	state.receiverUrl = url
	state.receiver = createClient(url, onProp)
	rerender()
}

const resumePause = () => {
	if (!state.receiver) return null
	if (!state.props.pause) state.receiver.pause()
	else state.receiver.resume()
	state.props.pause = !state.props.pause
	rerender()
}

const openAddDialog = () => {
	if (!state.receiver || state.addDialogOpen) return null
	state.addDialogOpen = true
	rerender()
}
const closeAddDialog = () => {
	if (!state.addDialogOpen) return null
	state.addDialogOpen = false
	rerender()
}

const actions = {
	connectTo, resumePause,
	openAddDialog, closeAddDialog
}
const createReceiverAction = (action) => function () {
	if (!state.receiver) return null
	return state.receiver[action].apply(state.receiver, arguments)
}
for (let action of [
	'play', 'queue', 'next', 'previous', 'remove', 'stop',
	'seek', 'setVolume'
]) actions[action] = createReceiverAction(action)

// render

let tree = document.querySelector('#app')
const rerender = () => { // todo: debounce?
	const newTree = render(state, actions)
	patch(tree, newTree)
	tree = newTree
}

setTimeout(rerender, 0)
