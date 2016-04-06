// port-client.js

void function () {
	const net = require('net');
	const TransformXor = require('./transform-xor');
	const LogManager = require('log-manager'), LogWriter = require('log-writer');
	const log = LogManager().setWriter(LogWriter('port-%s.log')).getLogger();

	function startPort(port, proxyPort, proxyHost) {

		const server = net.createServer(cliSoc => {
			const x1 = new TransformXor(0xCD);
			const x2 = new TransformXor(0xDB);
			const svrSoc = net.connect({host:proxyHost, port:proxyPort}, () => {
				cliSoc.pipe(x1);
				x1.pipe(svrSoc);
				svrSoc.pipe(x2);
				x2.pipe(cliSoc);
				svrSoc.on('error', err => { console.log(err); cliSoc.destroy(); svrSoc.destroy(); });
			});
			cliSoc.on('error', err => { console.log(err); cliSoc.destroy(); svrSoc.destroy(); });
		});
		server.listen(port, () => {
			//var port = server.address().port;
			log.info('listen', port);
		});

	}

	module.exports = startPort;

	if (module === require.main) {
		const port = process.argv[2] || 9998;
		const proxyPort = process.argv[3] || 9997;
		const proxyHost = process.argv[4] || 'localhost';
		startPort(port, proxyPort, proxyHost);
	}

}();
