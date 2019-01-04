const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Post } = require('./Post')
const { User } = require('./User')
const { Subscription } = require('./Subscription')

const resolvers = {
    Query,
    Mutation,
    Post,
    User,
    Subscription
}

module.exports = {
    resolvers
}