#!/usr/bin/env node

const findContainers = require('./find-container');
const { spawn } = require('child_process');

const argv = require('yargs')
  .usage('$0 --name <container-name> <cmd+args>')
  .option('name', {
    alias: 'n',
    describe: 'name of your container'
  })
  .option('command', {
    alias: 'c',
    describe: 'command'
  })
  .alias('cmd', 'command')
  .alias('name', 't')
  .demandOption(['name', 'command'])
  .help()
  .argv

findContainers(argv.name)
  .then(containers => {

    if (containers.length === 0) console.log('No containers found from image ' + argv.name);

    containers.forEach(container => {

      const args = ['exec', '-i', '-t', container.id].concat(argv.command.split(' '));
      console.log('Running:: docker '+args.join(' '))
      const newProc = spawn('docker', args,  { stdio: 'inherit' });
    });
  })
  .catch(reason => {
    console.error('There was a problem', reason);
  })