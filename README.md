<h1>
  <a href="http://node-machine.org" title="Node-Machine public registry"><img alt="node-machine logo" title="Node-Machine Project" src="http://node-machine.org/images/machine-anthropomorph-for-white-bg.png" width="50" /></a>
  aim-error-at
</h1>

Build or modify an Error so that it is aimed towards the specified exit.

Useful in synchronous machines, big switch statements, and loops inside of try/catch blocks. Also useful outside of the context of machines for assigning useful error codes to the errors sent back by ANY JavaScript function.


## Installation &nbsp; [![NPM version](https://badge.fury.io/js/aim-error-at.svg)](http://badge.fury.io/js/aim-error-at)

```bash
$ npm install aim-error-at --save --save-exact
```

[![NPM](https://nodei.co/npm/aim-error-at.png?downloads=true&stars=true)](https://nodei.co/npm/aim-error-at/)


## Usage

```javascript
var aimErrorAt = require('aim-error-at');
```


#### Modify existing error

```javascript
var err = aimErrorAt('notCandy', new Error('Hello'));
// => assert(err.exit === 'notCandy' && err.message === 'Hello')
// => assert(err.constructor.name === 'Error')
```

#### Build new error from a message

```javascript
var err = aimErrorAt('notCandy', 'Hello');
// => assert(err.exit === 'notCandy' && err.message === 'Hello')
// => assert(err.constructor.name === 'Error')
```

#### Build anonymous error

```javascript
var err = aimErrorAt('notCandy');
// => assert(err.exit === 'notCandy')
// => assert(err.constructor.name === 'Error')
```




## Examples

A few examples of using this module to handle errors in different scenarios.


#### In a synchronous scenario:

```javascript
try {
  _.each(candies, function (thisCandy) {
    throw aimErrorAt('notCandy', 'That\'s not a proper piece of candy!');
  });
}
catch (e) {
  if (e.exit && e.exit === 'notCandy') {
    // ... handle as you like here ...
    //
    // e.g.
    e.totalNumCandies = candies.length;
    throw e;
  }
  else {
    // Some other unexpected error.
    throw e;
  }
}

// Otherwise it worked.
return;
```

#### In an asynchronous scenario:

```javascript
async.each(candies, function (thisCandy, next) {
  return next( aimErrorAt('notCandy', 'That\'s not a proper piece of candy!') );
}, function afterwards(err) {
  if (err.exit && err.exit === 'notCandy') {
    // ... handle as you like here ...
    //
    // e.g. 
    console.warn('uh oh');
    err.totalNumCandies = candies.length;
    return cb(err);
  }
  else if (err) {
    // Some other unexpected error...
    return cb(err);
  }

  // Otherwise it worked.
  return cb();
});
```


#### In a machine definition

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

    try {
      inputs.potentialCandies.forEach(function (item){
        if (item !== 'candy') {
          throw aimErrorAt('notCandy');
        }
      });
    }
    catch (e) {
      if (e.exit && e.exit === 'notCandy') {
        // ... handle however you like here ...
        //
        // e.g.
        return exits.notCandy({ totalNumCandies: inputs.potentialCandies.length });
        // (note that we could have just used `return exits(e)` and the runner
        //  would have figured it out; calling the appropriate exit.
        //  Also since we're not inside a callback at this point in
        //  the code, simply throwing the error would technically work
        //  too, since the machine runner catches and handles all immediate
        //  errors)
      }
      else {
        // Using switchback to act like throwing:
        return exits(e);
      }
    }
    
    // Otherwise it worked.
    return exits.success();
  }
  
  
};
```


#### In a Sails.js action:

```javascript
if (!_.isArray(req.param('candies'))) {
  return res.badRequest('`candies` should be provided as a JSON-encoded array.'); 
}

async.each(req.param('candies'), function (thisCandy, next) {
  return next( aimErrorAt('notCandy', 'That\'s not a proper piece of candy!') );
}, function afterwards(err) {
  if (err.exit && err.exit === 'notCandy') {
    // ... handle as you like here ...
    //
    // e.g. 
    res.status(401);
    return res.json({ totalNumCandies: candies.length });
  }
  else if (err) {
    // Some other unexpected error...
    return res.serverError(err);
  }

  // Otherwise it worked.
  return res.ok();
});
```


## About &nbsp; [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/node-machine/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Learn more about the project and our goals at <a href="http://node-machine.org/implementing/FAQ" title="Machine Project FAQ (for implementors)">http://node-machine.org/implementing/FAQ</a> or check out the [project newsgroup](https://groups.google.com/forum/?hl=en#!forum/node-machine).


## License

MIT &copy; 2016 Mike McNeil and contributors

