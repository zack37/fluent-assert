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
- `assert.bool(...)`
- `assert.object(...)`
- `...`

fluent-assert has other type contracts such as:
- `assert.array(...) // Only checks to make sure value is an array`
- `assert.ok(...) // Asserts value is not null or undefined`
- `assert.custom(name, value, predicate) // Checks if value passes the predicate function`
- `...`


### String
The string assertion utility has some useful functions for validating the contract on string parameters
```js
assert.string('myVar', 'test');
```

#### #matches(regexp: RegExp)
Validates your value against the supplied regular expression. Throws an assertion error if value does not match or if the argument for matches is not a regular expression.
```js
assert.string('myVar', 'value').matches(/value/); // Safe
assert.string('myVar', 'value').matches(/banana/); // AssertionError: myVar should match pattern /banana/
assert.string('myVar', 'value').matches('Not regex') // AssertionError: parameter regexp should be of type RegExp
```

#### #notEmpty()
Validates your value is not an empty string. Throws an assertion error is string is empty. Only works for the empty string. Use `#notWhiteSpace` for all other "empty" string values
```js
assert.string('myVar', 'something').notEmpty(); // Safe`
assert.string('myVar', '').notEmpty(); // AssertionError: myVar should be a non empty string
```

#### #notWhiteSpace()

Validates your value is not only white space characters as dictated by JavaScripts RegExp. Will also validate value is not an empty string.
```js
assert.string('myVar', 'something').notWhiteSpace(); // Safe
assert.string('myVar', ' something ').notWhiteSpace(); // Safe
assert.string('myVar', ' ').notWhiteSpace(); // AssertionError: myVar should be a non white space only string
```

### Number
The number assertion helps you validate certain properties against numbers.
```js
assert.number('myVar', 0);
```

#### #min(min)
Validates your value is equal to or above the min argument. Throws an assertion error if value is below min.
```js
assert.number('myVar', 10).min(0); // Safe
assert.number('myVar', 10).min(10); // Safe
assert.number('myVar', 10).min(11); // AssertionError: myVar should be greater than 11
```

#### #max(max)
Validates your value is equal to or below the max argument. Throws an assertion error if value is above max.
```js
assert.number('myVar', 10).max(10); // Safe
assert.number('myVar', 10).max(100); // Safe
assert.number('myVar', 10).max(5); // AssertionError: myVar should be less than 5
```

#### #range(lower, upper)
Validates your value is within the specified range of [lower] and [upper]. Throws an assertion error if value is outside the range.
```js
assert.number('myVar', 10).range(1, 100); // Safe
assert.number('myVar', 10).range(10, 100); // Safe
assert.number('myVar', 10).range(1, 10); // Safe
assert.number('myVar', 10).range(11, 100); // AssertionError: myVar should be between [lower] and [upper]
assert.number('myVar', 10).range(1, 9); // AssertionError: myVar should be between 1 and 9
```

#### #even()
Validates your value is an even number. Throws an assertion error if value is odd.
```js
assert.number('myVar', 0).even(); // Safe
assert.number('myVar', 1).even(); // AssertionError: myVar should be even
```

#### #odd()
Validates your value is an odd number. Throws an assertion error if value is even.
```js
assert.number('myVar', 1).odd(); // Safe
assert.number('myVar', 0).odd(); // AssertionError: myVar should be odd
```

#### #equal(compare)
Validates your value is the same as [compare]. Throws an assertion error is value is not equal to [compare].
```js
assert.number('myVar', 10).equal(10); //Safe
assert.number('myVar', 10).equal(0); // AssertionError: myVar should be equal to 0
```

#### #in(values)
Validates your value is within an array of given values. Throws an assertion error is value is not within the array.
```js
assert.number('myVar', 10).in([2, 4, 6, 8 ,10]); // Safe
assert.number('myVar', 10).in([1, 3, 5, 7, 9]); // AssertionError: myVar should be in [1, 3, 5, 7, 9]
```

### Boolean
Since boolean values are so simple, there are no use cases for assertion chains on booleans.
```js
assert.bool('myVar', true); // Safe
assert.bool('myVar', {}); // AssertionError: myVar should be of type boolean
```

### Buffer
I'm not that keen on how Buffers work, so for now, there isn't any chaining functionality for Buffers
```js
assert.buffer('myVar', new Buffer(0));
```

### Object
The object assertion helps you validate certain properties against objects.
```js
assert.object('myVar', {});
```

#### #hasMember(member)
Validates your value has the specified [member]. Throws an assertion error if value does not have [member]
```js
assert.object('myVar', {greeting: 'Hello'}).hasMember('greeting'); // Safe
assert.object('myVar', {}).hasMember('greeting'); // AssertionError: Expected myVar to have member named greeting
```

#### #instanceOf(type)
Validates your value is an instance of [type] using the `instanceof` operator. Throws an assertion error is value is not an instance of [type]
```js
assert.object('myVar', Object('test')).instanceOf(String); // Safe
assert.object('myVar', Object('test')).instanceOf(Number); // AssertionError: myVar should be an instance of function Number() { ... }
```

### Array
The array assertion help you validate certain properties against array and its elements.
```js
assert.array('myVar', []);
```

#### #of(type)
Validates your array is a consistently typed array of [type]
```js
assert.array('myVar', [1, 2, 3]).of('number'); // Safe
assert.array('myVar', [1, 2, 3]).of(Number); // Safe
assert.array('myVar', [1, 2, '3']).of('number'); // AssertionError: myVar should be all of type number
assert.array('myVar', [1, 2, '3']).of(Number); // AssertionError: myVar should be all of type Number
```

#### #contains(value)
Validates your array contains some value. Useful for checking required values passed as an array
```js
assert.array('myVar', [1, 2, 3]).contains(2); // Safe
assert.array('myVar', [1, 2, 3]).contains(4); // AssertionError: myVar should contain 4
```

### Function
Functions are another of those simple types in javascript, so currently no useful assertions can be made of functions
```js
assert.function('myVar', function() {});
```

### Date
The date assertion helps you validate certain properties against javascript dates.
```js
assert.date('myVar', new Date('January 1, 1970'));
```

#### #before(date)
Validates your date occurs before [date]
```js
assert.date('myVar', new Date('January 1, 1970')).before(new Date('January 2, 1970')); // Safe
assert.date('myVar', new Date('January 1, 1970')).before(new Date('December 31, 1969')); // AssertionError: myVar should occur before ... Dec 31 1969 ...
```

#### #after(date)
Validates your date occurs after [date]
```js
assert.date('myVar', new Date('January 1, 1970')).after(new Date('December 31, 1969')); // Safe
assert.date('myVar', new Date('January 1, 1970')).after(new Date('January 2, 1970')); // AssertionError myVar should occur after ... Jan 02 1970 ...
```

#### #within(lower, upper)
Validates your date occurs between [lower] and [upper]
```js
assert.date('myVar', new Date('January 1, 1970')).within(new Date('December 31, 1969'), new Date('January 2, 1970')); // Safe
assert.date('myVar', new Date('January 1, 1970')).within(new Date('January 1, 1970'), new Date('January 3, 1970')); // Safe
assert.date('myVar', new Date('January 1, 1970')).within(new Date('December 30, 1969'), new Date('January 1, 1970')); // Safe
assert.date('myVar', new Date('January 1, 1970')).within(new Date('January 2, 1970'), new Date('January 4, 1970')); // AssertionError: myVar should be within ... Jan 02 1970 ... and ... Jan 04 1970 ...
assert.date('myVar', new Date('January 1, 1970')).within(new Date('December 29, 1969'), new Date('December 31, 1969')); // AssertionError: myVar should be within ... Dec 29 1969 ... and ... Dec 31 1960 ...
```

#### #dayOf(day)
Validates your date occurs on the day of [day]
```js
assert.date('myVar', new Date('January 1, 1970')).dayOf(1); // Safe
assert.date('myVar', new Date('January 1, 1970')).dayOf(2); // AssertionError: myVar should occur on day 2
```

#### #monthOf(month)
Validates your date occurs on the month of [month]
```js
assert.date('myVar', new Date('January 1, 1970')).monthOf(0); // Safe
assert.date('myVar', new Date('January 1, 1970')).monthOf('Jan'); // Safe
assert.date('myVar', new Date('January 1, 1970')).monthOf('January'); // Safe
assert.date('myVar', new Date('January 1, 1970')).monthOf(1); // AssertionError: myVar should occur on month 1
assert.date('myVar', new Date('January 1, 1970')).monthOf('Feb'); // AssertionError: myVar should occur on month Feb
assert.date('myVar', new Date('January 1, 1970')).monthOf('February'); // AssertionError: myVar should occur on month February
```

#### #yearOf(year)
Validates your date occurs on the year of [year]
```js
assert.date('myVar', new Date('January 1, 1970')).yearOf(1970); // Safe
assert.date('myVar', new Date('January 1, 1970')).yearOf(1969); // AssertionError: myVar should occur on year 1969
```
