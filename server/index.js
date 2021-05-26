const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require("express-graphql");

const app=express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true
}))

app.listen(5000, ()=>console.log('WORK!!!'))
