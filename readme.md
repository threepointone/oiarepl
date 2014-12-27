oiarepl
---
```
npm install oiarepl -g
oiarepl
```
!(screenshot)[http://i.imgur.com/vOIeyAK.png]

a tiny layer on node's `repl`. 
- evaluates oia expressions on the fly, and saves the result of the expression to `_last`
- you can pass in multiple expressions, and it'll evaluate each and return the last one
- to trigger multiline mode, start with `!`. when done, enter another `!`