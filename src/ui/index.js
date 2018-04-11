'use strict'

const h = require('snabbdom/h').default

const renderPlayer = (state, actions) => {
	const p = state.props
	const m = p.metadata || {}
	const name = m.title || p.filename

	return h('div#player', {}, [
		h('img#artwork', {
			attrs: {
				src: p.artwork || '',
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
		h('button#previous', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.previous
			}
		}, ['⏮']),
		h('button#resume-pause', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.resumePause
			}
		}, [
			p.pause || !p.filename ? '▶' : '⏸'
		]),
		h('button#next', {
			props: {
				disabled: !p.filename
			},
			on: {
				click: actions.next
			}
		}, ['⏭']),
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
		// todo: progress, duration labels
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

const render = (state, actions) => {
	return h('div#app', {}, [
		// todo
		h('button', {on: {
			click: () => actions.queue('http://jannis-mac.local:2000/audio/musik/lib/Beirut/No%20No%20No/01-01%20Gibraltar.m4a')
		}}, ['play sth']),
		renderPlayer(state, actions)
	])
}

module.exports = render
