process.chdir(__dirname);
require('./http-proxy')(process.argv[2] || 9999, process.argv[3] || 9998, process.argv[4] || 'localhost');
require('./port')(process.argv[5] || 9998, process.argv[6] || 9997, process.argv[7] || 'localhost');
