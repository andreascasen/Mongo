# @andycasen/Mongo #

A simple MongoDB interface built on top of the official **[MongoDB Driver](http://mongodb.github.io/node-mongodb-native/3.2/api/index.html)**.

## Initialize ##

Inside your terminal, run
```javascript
npm install @andycasen/Mongo
```

In your code, initialize the MongoDB class
```javascript
const Mongo = require('@andycasen/Mongo')
const mongoDB = new Mongo('<your db url>')
```