'use strict'

const h = require('snabbdom/h').default

const noArtwork = 'data:image/svg+xml,' + encodeURIComponent(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="200" height="200" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
	<rect x="0" y="0" width="900" height="900" fill="#fff"/>
	<path fill="#555" d="M620 575c-6.4 27.4-27.2 42.8-55.1 48-24.5 4.5-44.9 5.6-64.5-10.2-23.9-20.1-24.2-53.4-2.7-74.4 17-16.2 40.9-19.5 76.8-25.8 6-1.1 11.2-2.5 15.6-7.4 6.4-7.2 4.4-4.1 4.4-163.2 0-11.2-5.5-14.3-17-12.3-8.2 1.4-185.7 34.6-185.7 34.6-10.2 2.2-13.4 5.2-13.4 16.7 0 234.7 1.1 223.9-2.5 239.5-4.2 18.2-15.4 31.9-30.2 39.5-16.8 9.3-47.2 13.4-63.4 10.4-43.2-8.1-58.4-58-29.1-86.6 17-16.2 40.9-19.5 76.8-25.8 6-1.1 11.2-2.5 15.6-7.4 10.1-11.5 1.8-256.6 5.2-270.2.8-5.2 3-9.6 7.1-12.9 4.2-3.5 11.8-5.5 13.4-5.5 204-38.2 228.9-43.1 232.4-43.1 11.5-.8 18.1 6 18.1 17.6.2 344.5 1.1 326-1.8 338.5z"/>
</svg>`)

const formatDuration = (sec) => {
	if ('number' !== typeof sec) return '--'
	const min = Math.floor(sec / 60)
	sec = Math.round(sec % 60)
	return [
		('0' + min).slice(-2),
		('0' + sec).slice(-2)
	].join(':')
}

const renderPlayer = (state, actions) => {
	const p = state.props
	const m = p.metadata || {}
	const name = m.title || p.filename

	return h('div#player', {}, [
		h('img#artwork', {
			attrs: {
				src: p.artwork || noArtwork,
				alt: p.artwork ? `artwork for "${name}"` : ''
			}
		}),
		h('span#name', {
			attrs: {
				title: 'title/filename'
			}
		}, [
			name || ''
		]),
		h('span#album', {
			attrs: {
				title: 'album'
			}
		}, [
			m.album || ''
		]),
		h('span#artist', {
			attrs: {
				title: 'artist'
			}
		}, [
			m.artist || ''
		]),
		h('button#stop.control', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.stop
			}
		}, ['⏹']),
		h('button#previous.control', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.previous
			}
		}, ['⏮']),
		h('button#resume-pause.control', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.resumePause
			}
		}, [
			p.pause || !p.filename ? '▶' : '⏸'
		]),
		h('button#next.control', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.next
			}
		}, ['⏭']),
		h('button#add.control', {
			props: {
				disabled: !state.receiver
			},
			on: {
				click: actions.openAddDialog
			}
		}, ['➕']),
		h('label', {
			attrs: {
				for: 'progress'
			}
		}, [
			formatDuration(p.progress),
			' / ',
			formatDuration(p.duration)
		]),
		h('input#progress', {
			attrs: {
				type: 'range',
				min: '0',
				max: 'number' === typeof p.duration ? p.duration + '' : ''
			},
			props: {
				disabled: !p.filename,
				value: 'number' === typeof p.progress ? p.progress : 0
			},
			on: {
				change: ev => actions.seek(+ev.target.value)
			}
		}),
		h('label', {
			attrs: {
				for: 'volume'
			}
		}, ['volume']),
		h('input#volume', {
			attrs: {
				type: 'range',
				min: '0',
				max: '100'
			},
			props: {
				disabled: 'number' !== typeof p.volume,
				value: p.volume || 50
			},
			on: {
				change: ev => actions.setVolume(Math.round(ev.target.value))
			}
		})
	])
}

const renderAddDialog = (state, actions) => {
	if (!state.addDialogOpen) return ''
	const add = (action) => (ev) => {
		const textarea = ev.target.parentNode.querySelector('textarea')
		const val = textarea.value.trim()
		if (val) {
			action(val)
			actions.closeAddDialog()
		}
	}

	return h('div#add-dialog', {}, [
		h('div', {}, [
			h('textarea', {
				attrs: {
					autofocus: true
				}
			}, []),
			h('button', {
				on: {
					click: actions.closeAddDialog
				}
			}, ['cancel']),
			h('button', {
				on: {
					click: add(actions.play)
				}
			}, ['play right now']),
			h('button', {
				on: {
					click: add(actions.queue)
				}
			}, ['queue'])
		])
	])
}

const renderQueue = (state, actions) => {
	const queue = state.props.queue
	if (!Array.isArray(queue)) return ''

	const items = []
	for (let filename of queue) {
		items.push(h('li', {}, [filename]))
	}

	return h('ol#queue', {}, items)
}

const render = (state, actions) => {
	return h('div#app', {}, [
		renderPlayer(state, actions),
		renderAddDialog(state, actions),
		renderQueue(state, actions)
	])
}

module.exports = render
