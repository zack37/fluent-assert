# Contributing to fluent-assert

1. [Style Guild](#style-guide)
2. [Testing](#testing)

## Style Guide

Please follow the coding styles already put into place, but to resolve any ambiguities, here are some of the more
important guidelines.

Most guidelines can also be found in the
[.eslintrc](http://github.com/zack37/fluent-assert/blob/master/.eslintrc) and the
[.editorconfig](http://github.com/zack37/fluent-assert/blob/master/.editorconfig)

### Whitespace

- Try to keep the modules in /src to 80 columns, but definitely keep them less than 120
- 2 space indentation
- No trailing whitespace
- Insert final newline
- Spacing inside non-empty object block (e.g. `{}` OK, `{ x: 'x' }` OK
- LF end of file
- Always use curly braces for control structures (`if/if else/else/for/while/...`)
- Use additional line breaks between logical sections of code.

### Variables
- Use multiple `var` statements
- Declare when needed
- Don't mix node module requires and local requires. Node module requires at the top, then local requires.

### Equality and type checks

- Standard JavaScript convention, use `===` over `==`.
- For type checking, use the `common-assert` module.
  - Favor `common.typeCheck` over `common.toStringCheck` as `typeCheck` is faster. Only use `toStringCheck` if the
  object in question is typed as an Object (e.g. Date)

## Testing

- Testing structure should follow: `describe({Class})` -> `describe({#function})` -> `it({test name})`
- `it` descriptions should follow the *should* language style. (e.g. `it('should do what I think it does')`)
- There should be an extra line break between all describes and its, opening AND closing
- There needs to be at least two tests around all functions (valid input, invalid input, and if applicable, return value)
