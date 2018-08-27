const process = require('child_process');
const parse = require('./parse-ps');


module.exports = function findContainer(name) {
  name = name || '';
  name = name.toLowerCase().trim();
  
  return new Promise((resolve, reject) => {

    process.exec('docker ps -a', (err, stdout, stderr) => {
      if (stderr && stderr.length>0) return reject(stderr);
      if (!stdout) stdout = '';
      
      resolve(parse(stdout).filter(container => container.image.toLowerCase().trim() === name));
    });

  });
};