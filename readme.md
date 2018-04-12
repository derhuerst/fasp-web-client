# fasp-web-client

**A web app to control [Friendly Audio Streaming Protocol](https://github.com/derhuerst/friendly-audio-streaming-protocol) receivers.**

[![npm version](https://img.shields.io/npm/v/fasp-web-client.svg)](https://www.npmjs.com/package/fasp-web-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/fasp-web-client.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)

The [npm package](https://www.npmjs.com/package/fasp-web-client) contains a `dist` directory, which contains all necessary files for the web client. If you use [Express](https://expressjs.com/), you can serve them like this:

```js
const {dirname} = require('path')
const serve = require('serve-static')

const clientDir = dirname(require.resolve('fasp-web-client/dist/bundle.js'))

app.use(serve(clientDir))
```


## Contributing

If you have a question or have difficulties using `fasp-web-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/fasp-web-client/issues).
