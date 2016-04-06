<h1>
  <a href="http://node-machine.org" title="Node-Machine public registry"><img alt="node-machine logo" title="Node-Machine Project" src="http://node-machine.org/images/machine-anthropomorph-for-white-bg.png" width="50" /></a>
  aim-error-at
</h1>

### [Docs](http://node-machine.org/machinepack-process) &nbsp; [FAQ](http://node-machine.org/implementing/FAQ)  &nbsp;  [Newsgroup](https://groups.google.com/forum/?hl=en#!forum/node-machine)

Build or modify an Error so that it is aimed towards the specified exit.

Useful in synchronous machines, big switch statements, and loops inside of try/catch blocks. Also useful outside of the context of machines for assigning useful error codes to the errors sent back by ANY JavaScript function.


## Installation &nbsp; [![NPM version](https://badge.fury.io/js/machinepack-process.svg)](http://badge.fury.io/js/machinepack-process) [![Build Status](https://travis-ci.org/treelinehq/machinepack-process.png?branch=master)](https://travis-ci.org/treelinehq/machinepack-process)

```sh
$ npm install aim-error-at --save --save-exact
```


## Usage

```javascript
var aimErrorAt = require('aim-error-at');

var err;

err = aimErrorAt('notCandy', new Error('Hello));
// => assert(err.exit === 'notCandy' && err.message === 'Hello')

err = aimErrorAt('notCandy', 'Hello');
// => assert(err.exit === 'notCandy' && err.message === 'Hello')

err = aimErrorAt('notCandy');
// => assert(err.constructor === 'Error' && err.exit === 'notCandy')


```

#### Synchronous usage

```javascript
throw aimErrorAt('some);
```


## Example

```javascript
module.exports = {

  // ...
  
  exits: {
    
    success: {
      description: 'All potential candies have been confirmed as such.'
    },
    
    notCandy: {
      description: 'One or more of the potential candies is NOT CANDY.'
    }
    
  },


  fn: function (inputs, exits) {
    var aimErrorAt = require('aim-error-at');

    inputs.potentialCandies.forEach(function (item){
      if (item !== 'candy') {
        throw aimErrorAt('notCandy');
      }
    });
    
    return exits.success();
  }
  
  
};
```


## About  &nbsp; [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/node-machine/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Learn more at <a href="http://node-machine.org/implementing/FAQ" title="Machine Project FAQ (for implementors)">http://node-machine.org/implementing/FAQ</a>.

## License

MIT &copy; 2016 Mike McNeil and contributors

