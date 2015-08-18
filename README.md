# fluent-assert
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/zack37/fluent-assert?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/zack37/fluent-assert.svg?branch=master)](https://travis-ci.org/zack37/fluent-assert)

fluent-assert is meant to be a better way of specifying your contract signatures, allowing you to fluently make your assertions for not only types, but different properties of those types.

## Getting Started
First install through npm

`npm install --save fluent-assert`

And then require it

`var assert = require('fluent-assert');`


## Examples


### The Basics
All of fluent-asserts entry point functions (as described below) take two arguments: name and value. The only odd man out is assert.custom

fluent-assert has the most of the familiar contract assertions found in other libraries, including:
- `assert.string(...)`
- `assert.number(...)`
- `assert.boolean(...)`
- `assert.object(...)`

fluent-assert has other type contracts such as:
- `assert.array(...) // Only checks to make sure value is an array`
- `assert.ok(...) // Asserts value is not null or undefined`
- `assert.custom(name, value, predicate) // Checks if value passes the predicate function`



### String
The string assertion utility has some useful functions for validating the contract on string parameters

#### matches


### Number
### Boolean
### Object
### Array

